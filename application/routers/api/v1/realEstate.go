/**
 * @Author: 夜央 Oh oh oh oh oh oh (https://github.com/togettoyou)
 * @Email: zoujh99@qq.com
 * @Date: 2020/3/10 4:43 下午
 * @Description: 房地产信息相关接口
 */
package v1

import (
	"bytes"
	"encoding/json"
	"fmt"
	"github.com/gin-gonic/gin"
	bc "github.com/togettoyou/blockchain-real-estate/application/blockchain"
	"github.com/togettoyou/blockchain-real-estate/application/pkg/app"
	"io"
	"net/http"
	"os"
)

type RealEstateRequestBody struct {
	AccountId  string `json:"accountId"`  //操作人ID
	Proprietor string `json:"proprietor"` //所有者(业主)(业主AccountId)
	State      string `json:"adState"`    //总面积
	Link       string `json:"adLink"`     //生活空间
}

type RealEstateQueryRequestBody struct {
	Proprietor string `json:"proprietor"` //所有者(业主)(业主AccountId)
}

type PublishAdRequestBody struct {
	AccountId    string `json:"accountId"`    //操作人ID
	ObjectOfSale string `json:"objectOfSale"` //销售对象(正在出售的广告RealEstateID)
}

// @Summary 新建广告位(管理员)
// @Param realEstate body RealEstateRequestBody true "realEstate"
// @Produce  json
// @Success 200 {object} app.Response
// @Failure 500 {object} app.Response
// @Router /api/v1/createRealEstate [post]
func CreateRealEstate(c *gin.Context) {
	appG := app.Gin{C: c}
	body := new(RealEstateRequestBody)
	//解析Body参数
	if err := c.ShouldBind(body); err != nil {
		appG.Response(http.StatusBadRequest, "失败", fmt.Sprintf("参数出错%s", err.Error()))
		return
	}
	if body.State == "" {
		appG.Response(http.StatusBadRequest, "失败", "state 不能为空")
		return
	}
	var bodyBytes [][]byte
	bodyBytes = append(bodyBytes, []byte(body.AccountId))
	bodyBytes = append(bodyBytes, []byte(body.Proprietor))
	bodyBytes = append(bodyBytes, []byte(body.State))
	bodyBytes = append(bodyBytes, []byte(body.Link))
	//调用智能合约
	resp, err := bc.ChannelExecute("createRealEstate", bodyBytes)
	if err != nil {
		appG.Response(http.StatusInternalServerError, "失败", err.Error())
		return
	}
	var data map[string]interface{}
	if err = json.Unmarshal(bytes.NewBuffer(resp.Payload).Bytes(), &data); err != nil {
		appG.Response(http.StatusInternalServerError, "失败", err.Error())
		return
	}
	appG.Response(http.StatusOK, "成功", data)
}

// @Summary 获取房地产信息(空json{}可以查询所有，指定proprietor可以查询指定业主名下房产)
// @Param realEstateQuery body RealEstateQueryRequestBody true "realEstateQuery"
// @Produce  json
// @Success 200 {object} app.Response
// @Failure 500 {object} app.Response
// @Router /api/v1/queryRealEstateList [post]
func QueryRealEstateList(c *gin.Context) {
	appG := app.Gin{C: c}
	body := new(RealEstateQueryRequestBody)
	//解析Body参数
	if err := c.ShouldBind(body); err != nil {
		appG.Response(http.StatusBadRequest, "失败", fmt.Sprintf("参数出错%s", err.Error()))
		return
	}
	var bodyBytes [][]byte
	if body.Proprietor != "" {
		bodyBytes = append(bodyBytes, []byte(body.Proprietor))
	}
	//调用智能合约
	resp, err := bc.ChannelQuery("queryRealEstateList", bodyBytes)
	if err != nil {
		appG.Response(http.StatusInternalServerError, "失败", err.Error())
		return
	}

	fmt.Println("resp", string(resp.Payload))
	// 反序列化json
	var data []map[string]interface{}
	if err = json.Unmarshal(bytes.NewBuffer(resp.Payload).Bytes(), &data); err != nil {
		appG.Response(http.StatusInternalServerError, "失败", err.Error())
		return
	}
	appG.Response(http.StatusOK, "成功", data)
}

// @Summary 在指定广告位上发布广告
// @Param realEstateQuery body RealEstateQueryRequestBody true "realEstateQuery"
// @Produce  json
// @Success 200 {object} app.Response
// @Failure 500 {object} app.Response
// @Router /api/v1/queryRealEstateList [post]
func PublishOnRealEstate(c *gin.Context) {
	appG := app.Gin{C: c}
	body := new(PublishAdRequestBody)
	//解析Body参数
	if err := c.ShouldBind(body); err != nil {
		appG.Response(http.StatusBadRequest, "失败", fmt.Sprintf("参数出错%s", err.Error()))
		return
	}
	var bodyBytes [][]byte
	if body.AccountId != "" && body.ObjectOfSale != "" {
		bodyBytes = append(bodyBytes, []byte(body.AccountId))
		bodyBytes = append(bodyBytes, []byte(body.ObjectOfSale))
	}
	//调用智能合约
	resp, err := bc.ChannelQuery("publishOnRealEstate", bodyBytes)
	if err != nil {
		appG.Response(http.StatusInternalServerError, "失败", err.Error())
		return
	}
	// 反序列化json
	var data []map[string]interface{}
	if err = json.Unmarshal(bytes.NewBuffer(resp.Payload).Bytes(), &data); err != nil {
		appG.Response(http.StatusInternalServerError, "失败", err.Error())
		return
	}
	appG.Response(http.StatusOK, "成功", data)
}

func Upload(c *gin.Context) {
	appG := app.Gin{C: c}
	file, header, err := c.Request.FormFile("file")
	if err != nil {
		c.String(http.StatusBadRequest, fmt.Sprintf("file err : %s", err.Error()))
		return
	}
	filename := header.Filename
	out, err := os.Create("public/" + filename)
	if err != nil {
		appG.Response(http.StatusInternalServerError, "失败", err.Error())
	}
	defer out.Close()
	_, err = io.Copy(out, file)
	if err != nil {
		appG.Response(http.StatusInternalServerError, "失败", err.Error())
	}
	filepath := "http://161.117.225.66:8000/file/" + filename
	accountId := c.Request.FormValue("accountId")
	objectOfSale := c.Request.FormValue("objectOfSale")
	fmt.Println("accountID", accountId)
	fmt.Println("objectOfSale", objectOfSale)
	fmt.Println("filepath", filepath)

	//处理参数
	var bodyBytes [][]byte
	if accountId != "" && objectOfSale != "" {
		bodyBytes = append(bodyBytes, []byte(accountId))
		bodyBytes = append(bodyBytes, []byte(objectOfSale))
		bodyBytes = append(bodyBytes, []byte(filepath))
	}
	//调用智能合约
	resp, err := bc.ChannelExecute("publishOnRealEstate", bodyBytes)
	if err != nil {
		appG.Response(http.StatusInternalServerError, "失败", err.Error())
		return
	}

	// 反序列化json
	var data []map[string]interface{}
	if err = json.Unmarshal(bytes.NewBuffer(resp.Payload).Bytes(), &data); err != nil {
		appG.Response(http.StatusInternalServerError, "失败", err.Error())
		return
	}
	appG.Response(http.StatusOK, "成功", data)
}
