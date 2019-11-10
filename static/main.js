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

  $.ajax({
    type: "POST",
    contentType: "application/json",
    // processData: false,
    dataType: "json",
    url: "/configs",
    data: JSON.stringify({ "id": "1", "Token": "1" }),
    success: function (message) {
      console.log("提交成功", JSON.stringify(message));
    },
    error: function (message) {
      console.error("提交失败", JSON.stringify(message));
    }
  });
};