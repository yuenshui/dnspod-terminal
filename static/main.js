var DT = {};
DT.version = "1.0.0";
DT.name = "DNSPOD 域名管理";
DT.loading = false;
DT.loadConfig = function () {
  this.loading = true;
  $.get("/configs", {},
    function (data) {
      // console.log('load configs:', data); //  2pm
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

  // 获取域名设置列表
  $.ajax({
    type: "GET",
    contentType: "application/json",
    dataType: "json",
    url: "/records",
    data: { id: 120333, domain_id: 2655709 },
    success: function (message) {
      console.log("提交成功", JSON.stringify(message));
    },
    error: function (message) {
      console.error("提交失败", JSON.stringify(message));
    }
  });

  // 获取域名权限
  $.ajax({
    type: "GET",
    contentType: "application/json",
    dataType: "json",
    url: "/domain/purview",
    data: { id: 120333, domain_id: 2655709 },
    success: function (message) {
      console.log("提交成功", JSON.stringify(message));
    },
    error: function (message) {
      console.error("提交失败", JSON.stringify(message));
    }
  });

  // 获取域名记录允许的类型
  $.ajax({
    type: "GET",
    contentType: "application/json",
    dataType: "json",
    url: "/record/types",
    data: { id: 120333 },
    success: function (message) {
      console.log("提交成功", JSON.stringify(message));
    },
    error: function (message) {
      console.error("提交失败", JSON.stringify(message));
    }
  });

  // 获取域名记录允许的线路
  $.ajax({
    type: "GET",
    contentType: "application/json",
    dataType: "json",
    url: "/record/line",
    data: { id: 120333 },
    success: function (message) {
      console.log("提交成功", JSON.stringify(message));
    },
    error: function (message) {
      console.error("提交失败", JSON.stringify(message));
    }
  });

  // 添加域名
  // 6 域名无效
  // 7 域名已存在
  // 11 域名已经存在并且是其它域名的别名
  // 12 域名已经存在并且您没有权限管理
  // 41 网站内容不符合DNSPod解析服务条款, 域名添加失败
  $.ajax({
    type: "POST",
    contentType: "application/json",
    dataType: "json",
    url: "/domain",
    data: JSON.stringify({ id: 120333, domain: "yuenshui.com" }),
    success: function (message) {
      console.log("提交成功", JSON.stringify(message));
    },
    error: function (message) {
      console.error("提交失败", JSON.stringify(message));
    }
  });

  // 添加记录
  // -15 域名已被封禁
  // -7 企业账号的域名需要升级才能设置
  // -8 代理名下用户的域名需要升级才能设置
  // 6 缺少参数或者参数错误
  // 7 不是域名所有者或者没有权限
  // 21 域名被锁定
  // 22 子域名不合法
  // 23 子域名级数超出限制
  // 24 泛解析子域名错误
  // 500025 A记录负载均衡超出限制
  // 500026 CNAME记录负载均衡超出限制
  // 26 记录线路错误
  // 27 记录类型错误
  // 30 MX 值错误，1-20
  // 31 存在冲突的记录(A记录、CNAME记录、URL记录不能共存)
  // 32 记录的TTL值超出了限制
  // 33 AAAA 记录数超出限制
  // 34 记录值非法
  // 36 @主机的NS纪录只能添加默认线路
  // 82 不能添加黑名单中的IP
  $.ajax({
    type: "POST",
    contentType: "application/json",
    dataType: "json",
    url: "/record",
    data: JSON.stringify({
      id: 120333,
      domain_id: 2655709,
      value: '124.200.27.49',
      sub_domain: 'testtt',
      record_type: 'A',
      record_line: '默认',
      record_line_id: '0',
      mx: '0',
      ttl: '120',
      status: 'enable'
    }),
    success: function (message) {
      console.log("提交成功", JSON.stringify(message));
    },
    error: function (message) {
      console.error("提交失败", JSON.stringify(message));
    }
  });

  // 移除 config
  $.ajax({
    type: "POST",
    contentType: "application/json",
    dataType: "json",
    url: "/config/remove",
    data: JSON.stringify({
      id: 120333
    }),
    success: function (message) {
      console.log("提交成功", JSON.stringify(message));
    },
    error: function (message) {
      console.error("提交失败", JSON.stringify(message));
    }
  });

  // 移除域名
  $.ajax({
    type: "POST",
    contentType: "application/json",
    dataType: "json",
    url: "/config/remove",
    data: JSON.stringify({
      id: 120333,
      domain_id: 2655709
    }),
    success: function (message) {
      console.log("提交成功", JSON.stringify(message));
    },
    error: function (message) {
      console.error("提交失败", JSON.stringify(message));
    }
  });

  // 移除记录
  $.ajax({
    type: "POST",
    contentType: "application/json",
    dataType: "json",
    url: "/config/remove",
    data: JSON.stringify({
      id: 120333,
      domain_id: 2655709,
      record_id: 33
    }),
    success: function (message) {
      console.log("提交成功", JSON.stringify(message));
    },
    error: function (message) {
      console.error("提交失败", JSON.stringify(message));
    }
  });

  // 更新记录
  $.ajax({
    type: "POST",
    contentType: "application/json",
    dataType: "json",
    url: "/record/ip",
    data: JSON.stringify({
      id: 120333,
      domain_id: 2655709,
      record_id: 33,
      value: '1.2.3.4'
    }),
    success: function (message) {
      console.log("提交成功", JSON.stringify(message));
    },
    error: function (message) {
      console.error("提交失败", JSON.stringify(message));
    }
  });
};