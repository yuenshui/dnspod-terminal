import React, { Component } from 'react';
import './App.css';
import { Layout, Select, Row, Col, Table, Divider, Button, Modal, Input, message } from 'antd';
import fetch from 'node-fetch';
const axios = require('axios');

// const httpapi = require("./httpapi");

const { Option } = Select;


const { Header, Footer, Sider, Content } = Layout;
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'Hello Runoob!',
      dataIds: [],

      size: "large",
      ModalText: 'Content of the modal',
      visible: false,
      confirmLoading: false,
      createId: '120333',
      createToken: '18f709bc28ea9efeb6d971458f8ba3f6',
      host: "http://localhost:1229/",
      domains: [],
      recordsData: [],
      currentID: 0,
      cowadayID: 0,

      domainName: '',
      DomainFrom: false,
      confirmLoadingD: false,
      loading1: false,
      loading2: false,

      RecordFrom: false,

      RecordValue: "",
      RecordSub_domain: "",
      typesData: [],
      typesDataHtml: [],
      Record_Type: "",

      lineData: [],
      lineDataHtml: [],
      Record_Line: '',
      Record_Line_Id: '',
      RecordMx: "",
      RecordTtl: '',
      RecordStatus: ""






    };

    // this.handleChange = this.handleChange.bind(this);
  }

  // 初始化函数
  componentDidMount = async () => {
    var that = this;
    console.log("我被调用了");
    axios.get(that.state.host + "configs", {
      // params: {
      //   ID: 12345
      // }
    })
      .then(function (response) {
        that.setState({
          dataIds: Object.values(response.data.data),
        });
      })
      .catch(function (error) {
        console.log(error);
      })
      .then(function () {
        // always executed
      });

    // var ar = await  httpapi.http(this.state.host+"configs", {
    //   method: "get",
    // });
    // var ar = await  httpapi.http(this.host + uri, {
    //   method: "get",
    //   data: data
    // });


  }
  // 添加浮窗  下拉选择 构建
  RecordFromRendering = () => {

    let typesData = this.state.typesData.data,
      lineData = this.state.lineData.data,
      typesDataHtml = [],
      lineDataHtml = [];
    for (let i in typesData)
      typesDataHtml.push(
        <Option value={typesData[i]} key={typesData[i]} >{typesData[i]}</Option>
      )
    for (let i in lineData)
      lineDataHtml.push(
        <Option value={lineData[i]} key={lineData[i]} >{i}</Option>
      )
    this.setState({
      typesDataHtml: typesDataHtml,
      lineDataHtml: lineDataHtml
    })
  }

  EditColick = (e) => {
    console.log(e);
    var that = this;
    var id = e.id;
    that.setState({
      loading2: true,
    });

    axios.get(that.state.host + "records", {
      params: {
        id: this.state.currentID,
        domain_id: id
      }
    })
      .then(function (e) {
        console.log(e.data);
        let data = e.data;

        if (data.code == 1) {
          //成功
          that.setState({
            recordsData: data.data,
            cowadayID: id
          });
        } else {
          // 异常放回

        }
      })
      .catch(function (error) {
        console.log(error);
      })
      .then(function () {
        // always executed
        that.setState({
          loading2: false,
        });
      });




  }
  DomainNameTable = () => {
    var that = this

    that.setState({
      loading1: true,
    });

    axios.get(that.state.host + "domains", {
      params: {
        id: that.state.currentID
      }
    })
      .then(function (e) {

        console.log(e.data);
        let data = e.data;

        if (data.code == 1) {
          //成功
          that.setState({
            domains: data.data,
            loading1: false,
          });
        } else {
          // 异常放回

        }

        // that.setState({
        //   dataIds: Object.values(response.data),
        // });
      })
      .catch(function (error) {
        console.log(error);
        // 请求失败
      })
      .then(function () {
        // always executed
      });

    // var ar = await  httpapi.http(this.state.host+"domains", {
    //   method: "get",
    //   type: 'url',
    //   data:{
    //     id 
    //   }
    // });
    // console.log(ar);


  }
  handleChange = (value) => {

    this.setState({
      currentID: value
    }, () => {
      this.DomainNameTable()
    });
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = () => {
    var that = this;
    console.log(this.state.createId);
    this.setState({
      ModalText: 'The modal will be closed after two seconds',
      confirmLoading: true,
    });
    let id = this.state.createId;
    let Token = this.state.createToken;


    fetch('http://localhost:1229/configs',
      {
        method: 'POST',
        body: JSON.stringify({ "id": id, "token": Token }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(res => res.json())
      .then(json => {
        that.setState({
          visible: false,
          confirmLoading: false,
        });
        message.success('添加成功');

        console.log(json)
      });

  };
  columnsClick = (e) => {
    console.log(e);
  }
  handleCancel = () => {
    console.log('Clicked cancel button');
    this.setState({
      visible: false,
      DomainFrom: false,
      RecordFrom: false

    });
  };
  // 添加 记录
  RecordOnOk = () => {
    let that = this;
    if (!that.state.RecordValue) {
      message.error('value 字段不得为空');
      return;
    } else if (!that.state.RecordSub_domain) {
      message.error('sub_domain 字段不得为空');
      return;
    }
    else if (!that.state.Record_Type) {
      message.error('record_type 字段不得为空');
      return;
    }
    else if (!that.state.Record_Line) {
      message.error('record_line 字段不得为空');
      return;
    }
    else if (!that.state.RecordMx) {
      message.error('mx 字段不得为空');
      return;
    }
    else if (!that.state.RecordTtl) {
      message.error('ttl 字段不得为空');
      return;
    }
    else if (!that.state.RecordStatus) {
      message.error('status 字段不得为空');
      return;
    }
    else {
      this.setState({
        RecordLoadingD: true
      })
      axios.post(that.state.host + "record",
        {
          id: that.state.currentID,
          domain_id: that.state.cowadayID,
          value: that.state.RecordValue,
          sub_domain: that.state.RecordSub_domain,
          record_type: that.state.Record_Type,
          record_line: that.state.Record_Line,
          record_line_id: that.state.Record_Line_Id,
          mx: that.state.RecordMx,
          ttl: that.state.RecordTtl,
          status: that.state.RecordStatus
        }
      )
        .then(function (e) {
          console.log(e.data);
          let data = e.data;
          let code = data.code;
          if (code == -15) {
            message.error('域名已被封禁');
          } else if (code == -7) {
            message.error('企业账号的域名需要升级才能设置');
          } else if (code == -8) {
            message.error('代理名下用户的域名需要升级才能设置');
          } else if (code == 6) {
            message.error('代理名下用户的域名需要升级才能设置');
          } else if (code == 7) {
            message.error('不是域名所有者或者没有权限');
          } else if (code == 21) {
            message.error('域名被锁定');
          } else if (code == 22) {
            message.error('子域名不合法');
          } else if (code == 23) {
            message.error('子域名级数超出限制');
          } else if (code == 24) {
            message.error('泛解析子域名错误');
          } else if (code == 500025) {
            message.error('A记录负载均衡超出限制');
          } else if (code == 500026) {
            message.error('CNAME记录负载均衡超出限制');
          } else if (code == 26) {
            message.error('记录线路错误');
          } else if (code == 27) {
            message.error('记录类型错误');
          } else if (code == 30) {
            message.error('MX 值错误，1-20');
          } else if (code == 31) {
            message.error('存在冲突的记录(A记录、CNAME记录、URL记录不能共存)');
          } else if (code == 32) {
            message.error('记录的TTL值超出了限制');
          } else if (code == 33) {
            message.error('AAAA 记录数超出限制');
          } else if (code == 34) {
            message.error('记录值非法');
          } else if (code == 36) {
            message.error('@主机的NS纪录只能添加默认线路');
          } else if (code == 82) {
            message.error('不能添加黑名单中的IP');
          }
          else {
            that.setState({
              visible: false,
              RecordLoadingD: false,
            })
            message.success('添加成功');
            // mian1m
          }


        }).catch(function (error) {
          console.log(error);

        })
        .then(function () {
          that.setState({
            RecordLoadingD: false,
          });
        });
    }

  }
  // 添加域名
  DomainOnOk = () => {
    this.setState({
      confirmLoadingD: true,
    });
    let that = this;
    axios.get(that.state.host + "records", {
      params: {
        id: this.state.currentID,
        domain: that.state.domainName
      }
    })
      .then(function (e) {
        console.log(e.data);
        let data = e.data;

        if (data.code == 1) {
          //成功
          that.setState({
            visible: false,
            confirmLoading: false,
          });
          message.success('添加成功');
          data.DomainNameTable()
        } else {
          // 异常

        }
      })
      .catch(function (error) {
        console.log(error);
      })
      .then(function () {
        // always executed
      });

  }
  RecorClick = () => {
    let that = this;
    if (that.state.cowadayID) {
      that.setState({ RecordFrom: true })
      let promiseUtil = (url) => {
        return new Promise((resolve, reject) => {
          axios.get(that.state.host + url, {
            params: {
              id: that.state.currentID,
            }
          })
            .then(function (e) {
              resolve(e);
              console.log(e.data);
              let data = e.data;

              if (data.code == 1) {

              } else {
                // 异常放回 
              }
            })
            .then(function (e) {
              // always executed
              resolve(e);
            })
            .catch(function (e) {
              console.log(e);
              reject(e);
            });
        })
          .then(data => data)
          .catch(e => e);
      }
      // 使用Promise.all发送请求
      // 如果中间有一个失败，则进入失败方法
      Promise.all([
        promiseUtil('record/types'),
        promiseUtil("record/line"),
      ]).then((data) => {
        // 执行成功
        console.log('请求成功: $(data)', data);
        let [data1, data2] = [data[0].data, data[1].data];

        that.setState({
          typesData: data1,
          lineData: data2,
        }, () => {
          that.RecordFromRendering()
        })


      }, (error) => {
        console.log('请求失败：')
        console.log(error);
      })

    } else {
      message.error('无法添加');
    }
  }
  render() {
    // console.log(this.state.dataIds)
    var dataIds = this.state.dataIds;

    let columnList1 = [{
      title: 'owner',
      dataIndex: 'owner',
      key: 'owner',

    },
    {
      title: 'punycode',
      dataIndex: 'punycode',
      key: 'punycode',
    },
    {
      title: 'name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: "grade_title",
      dataIndex: "grade_title",
      key: "grade_title",
    },
    {
      title: '编辑',
      dataIndex: 'id',
      key: 'id',
      render: (id, record) => (
        <span>
          <Button onClick={() => {
            console.log("fire click", id);
            this.EditColick(record)
          }}
            type="primary">编辑</Button>
        </span>

      )
    },

    ];
    let columnList2 = [{
      title: 'type',
      dataIndex: 'type',
      key: 'type',

    },
    {
      title: 'line',
      dataIndex: 'line',
      key: 'line',
    },
    {
      title: 'name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: "id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: '编辑',
      dataIndex: '',
      key: '',
      render: (id, record) => (
        <span>
          <Button onClick={() => {
            console.log("fire click", id);
            this.EditColick(record)
          }}
            type="primary">编辑</Button>
        </span>

      )
    },
    ];

    var html = [];
    for (let i in dataIds) {
      html.push(<Option value={dataIds[i].id} key={dataIds[i].id }>{dataIds[i].id}</Option>)
    }
    return (
      <div className="App">
        <Layout>
          <Header>
            <Select defaultValue="ID" style={{ width: 120 }} onChange={this.handleChange}>
              {/* <Option value="jack">Jack</Option>
                    <Option value="lucy">Lucy</Option>
                    <Option value="disabled" disabled>
                      Disabled
                    </Option>
                    <Option value="Yiminghe">yiminghe</Option> */}
              {html}


            </Select>
            <Button style={{ marginLeft: "20px" }} type="primary" shape="round" icon="plus" onClick={this.showModal}>
              添加
              </Button>
            <Modal
              title="表单"
              visible={this.state.visible}
              onOk={this.handleOk}
              confirmLoading={this.state.confirmLoadingD}
              onCancel={this.handleCancel}
              okText="提交"
              cancelText='取消'
            >
              <div>
                <span>ID:</span> <Input size="large" onChange={e => this.setState({ createId: e.target.value })} value={this.state.createId} ></Input>
              </div>
              <div>
                <span>Token:</span> <Input size="large" onChange={e => this.setState({ createToken: e.target.value })} value={this.state.createToken} ></Input>
              </div>




            </Modal>
          </Header>
          <Content>



            <Row className="row" type="flex">
              <Col className="col" span={12}>
                <Button type="primary" onClick={() => {
                  if (this.state.currentID) {
                    this.setState({ DomainFrom: true })
                  } else {
                    message.error('无法添加');
                  }

                }}>添加域名</Button>

                <Modal
                  title="添加域名"
                  visible={this.state.DomainFrom}
                  onOk={this.DomainOnOk}
                  confirmLoading={this.state.confirmLoadingD}
                  onCancel={this.handleCancel}
                  okText="提交"
                  cancelText='取消'
                >
                  <div>
                    <span>域名:</span> <Input size="large" onChange={e => this.setState({ domainName: e.target.value })} value={this.state.domainName} ></Input>
                  </div>





                </Modal>
                <Table
                  columns={columnList1}
                  // rowKey={} 
                  // rowKey="uid" 
                  rowKey={record => record.id}
                  // rowKey={this.state.domains.id}
                  dataSource={this.state.domains}
                  loading={this.state.loading1}
                  size="small"
                />
              </Col>
              <Col className="col" span={12}>
                <Button type="primary" onClick={() => {
                  this.RecorClick()


                }}>添加记录</Button>
                <Modal
                  title="添加记录"
                  visible={this.state.RecordFrom}
                  onOk={this.RecordOnOk}
                  confirmLoading={this.state.RecordLoadingD}
                  onCancel={this.handleCancel}
                  okText="提交"
                  cancelText='取消'
                >
                  <div>
                    {/* id: 120333,
                  domain_id: 2655709,
                  value: '124.200.27.49',
                  sub_domain: 'testtt',
                  record_type: 'A',
                  record_line: '默认',
                  record_line_id: '0',
                  mx: '0',
                  ttl: '120',
                  status: 'enable' */}
                    {/* RecordValue:"",
                    RecordSub_domain:"",
                    typesData:[],
                    typesDataHtml:[],
                    Record_Type:"",

                    lineData:[],
                    lineDataHtml:[],
                    Record_Line: '',
                    Record_Line_Id: '',
                    RecordMx:"",
                    RecordTtl:'',
                    RecordStatus:"" */}



                    <span>value:</span> <Input size="large" onChange={e => this.setState({ RecordValue: e.target.value })} value={this.state.RecordValue} ></Input>
                    <span>sub_domain:</span> <Input size="large" onChange={e => this.setState({ RecordSub_domain: e.target.value })} value={this.state.RecordSub_domain} ></Input>

                    <span>record_type:</span>
                    <Select defaultValue="large" size="large" style={{ width: "100%" }} onChange={(e, s) => {
                      console.log(e, s);
                      this.setState({ Record_Type: e })
                    }}>
                      {/* <Option value="jack" data-id="123">Jack</Option>
                      <Option value="lucy">Lucy</Option> */}
                      {this.state.typesDataHtml}
                    </Select>
                    <span>record_line:</span>
                    <Select defaultValue="large" size="large" style={{ width: "100%", height: "40px" }} onChange={(e, s) => {
                      console.log(e, s);

                      this.setState({ Record_Line: s.props.children, Record_Line_Id: e })
                    }}>
                      {this.state.lineDataHtml}
                    </Select>
                  </div>
                  <span>mx:</span> <Input size="large" onChange={e => this.setState({ RecordMx: e.target.value })} value={this.state.RecordMx} ></Input>
                  <span>ttl:</span> <Input size="large" onChange={e => this.setState({ RecordTtl: e.target.value })} value={this.state.RecordTtl} ></Input>
                  <span>status:</span> <Input size="large" onChange={e => this.setState({ RecordStatus: e.target.value })} value={this.state.RecordStatus} ></Input>


                </Modal>
                <Table
                  columns={columnList2}
                  dataSource={this.state.recordsData}
                  rowKey={record => record.id}
                  loading={this.state.loading2}
                  size="small"
                />
              </Col>
            </Row>
          </Content>
          {/* <Footer>Footer</Footer> */}


        </Layout>
      </div>
    );
  }

}

export default App;
