var DT = {};
DT.version = "1.0.0";
DT.name = "DNSPOD 域名管理";
DT.loading = false;
DT.loadConfig = function () {
  this.loading = true;
  $.get("/configs", {},
    function (data) {
      console.log('load configs:', data); //  2pm
    }, "json");

  // 添加token
  // $.ajax({
  //   type: "POST",
  //   contentType: "application/json",
  //   // processData: false,
  //   dataType: "json",
  //   url: "/configs",
  //   data: JSON.stringify({ "id": "120333", "token": "18f709bc28ea9efeb6d971458f8ba3f6" }),
  //   success: function (message) {
  //     console.log("提交成功", JSON.stringify(message));
  //   },
  //   error: function (message) {
  //     console.error("提交失败", JSON.stringify(message));
  //   }
  // });

  // 获取域名列表
  $.ajax({
    type: "GET",
    contentType: "application/json",
    dataType: "json",
    url: "/domains",
    data: { "id": "120333" },
    success: function (message) {
      console.log("提交成功", JSON.stringify(message));
    },
    error: function (message) {
      console.error("提交失败", JSON.stringify(message));
    }
  });
};