import React from 'react';
import { Button, Table, Select, Form, Row, Col } from 'antd';
import ZhenghangDiaozheng from './modal/zhenghangDiaozheng.jsx';
import ProjTreeCommon from './common/projTreeCommon.jsx';
import DictItemDisplay from 'DictItemDisplay';
import { bindActionCreators } from 'redux';
import TitleWithTools from 'TitleWithTools';
import DictItemSelect from 'DictItemSelect';
import _cloneDeep from 'lodash/cloneDeep';
import ThisCss from './otherMsgCss.less';
import ProjBldTree from 'ProjBldTree';
import { connect } from 'react-redux';
import _isEmpty from 'lodash/isEmpty';
import * as action from '../action';
import { hasPermission } from 'util';

const Option = Select.Option;
const FormItem = Form.Item

class OtherMsg extends React.Component {
  constructor() {
    super();
    this.state = {
      columns: [],
      UpdateHkaddressvisible: false,
      flooryyVisiblie: [],
      data: [],
      roomDisplay: false,
      sightCheckedVue: [],
      sightCheckedStatus: false,
      westCheckedVue: [],
      westCheckedStatus: false,
      isannexeCheckedVue: [],
      isannexeCheckedStatus: false,
      hanglieAll: [],
      lieNoValue: [],
      roomValue: [],
      westChainVisible: [],
      initRoomData: [],
      addNumberqq: []
    }
  }
  componentWillReceiveProps(nextProps) {
    if ((this.props.controlData !== nextProps.controlData) || (this.props.displayChanged !== nextProps.displayChanged)) {
      const unit = _cloneDeep(nextProps.controlData.data.uData);
      const room = _cloneDeep(nextProps.controlData.data.rData);

      //没有数据不显示
      if (!unit.length && !room.length) {
        this.setState({
          columns: [],
          data: []
        })
        return;
      }

      const displayChanged = nextProps.displayChanged;
      let wuxiao = [];
      var pushData = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20']
      var pushhData = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20']
      if ((unit.length >= 1) && ((unit[0].rooms)[0] === '1')) {
        pushData = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20']
        pushhData = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20']
      }
      if ((unit.length >= 1) && ((unit[0].rooms)[0] === '001')) {
        pushData = ['001', '002', '003', '004', '005', '006', '007', '008', '009', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20']
        pushhData = ['001', '002', '003', '004', '005', '006', '007', '008', '009', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20']
      }
      if (unit.length >= 1) {
        let endRoomDa = []
        let endRoommDa = []
        let changdu = []
        const biaogeNumber = Math.ceil((((document.body.clientWidth) * (0.82)) / 120) - 2);
        // console.log('log8080 biaogeNumber---', biaogeNumber);
        unit.forEach((abc) => {
          changdu = changdu.concat(abc.rooms)
        })
        console.log('changdu', changdu);
        if (changdu.length < biaogeNumber && unit.length < 2) {
          let roomsParseint = []
          unit[unit.length - 1].rooms.forEach((sp) => {
            roomsParseint.push(parseInt(sp))
          })
          const addNumber = roomsParseint
          endRoomDa = unit[unit.length - 1].rooms.concat(pushData)
          unit[unit.length - 1].rooms = (this.deleteRepetion(endRoomDa)).slice(0, biaogeNumber)
          unit[unit.length - 1].roomnolist = String(unit[unit.length - 1].rooms)
          this.getData(unit, room, displayChanged, addNumber);
          return;
        }
        // 两单元以上
        if (changdu.length < biaogeNumber && unit.length > 1) {
          let roomsParseintt = []
          unit[unit.length - 1].rooms.forEach((sp) => {
            roomsParseintt.push(parseInt(sp))
          })
          const addNumberr = roomsParseintt
          const sliceLength = biaogeNumber - (changdu.length - unit[unit.length - 1].rooms.length)
          // console.log('log8080 sliceLength--', sliceLength);
          endRoommDa = unit[unit.length - 1].rooms.concat(pushhData)
          unit[unit.length - 1].rooms = (this.deleteRepetion(endRoommDa)).slice(0, sliceLength)
          unit[unit.length - 1].roomnolist = String(unit[unit.length - 1].rooms)
          this.getData(unit, room, displayChanged, addNumberr);
          return;
        }
        this.getData(unit, room, displayChanged, wuxiao);
      } else {
        // return
        this.getData(unit, room, displayChanged, wuxiao);
      }
    }
    // console.log('加载即执行', nextProps.controlData.data.rData);
    this.setState({
      initRoomData: nextProps.controlData.data.rData
    })
    if (this.props.displayChanged !== nextProps.displayChanged) {
      const paramss = {
        room: this.props.displayChanged,
        flagg: true
      }
      this.danyuangeChange(paramss)
    }
  }
  // js去重--http://blog.csdn.net/genius_yym/article/details/53054242
    deleteRepetion(arr) {
      let arrTable = {};
      let arrData = [];
      for (var i = 0; i < arr.length; i++) {
        if (!arrTable[arr[i]]) {
          arrTable[arr[i]] = true;
          arrData.push(arr[i])
        }
      }
      return arrData;
    }
    // 数组包含函数
    contains(arr, obj) {
      // console.log('执行的函数contains', arr, obj);
      obj = parseInt(obj)
      let i = arr.length;
      while (i--) {
        if (arr[i] == obj) {
          return true;
        }
      }
      return false;
    }
  getData(unit, room, displayChanged, addNumber) {
    // console.log('(OtherMsg)这是其他信息的displayChanged', displayChanged);
    const col = [];
    col.push({ title: '楼层', dataIndex: 'floor', key: 'floor', sortOrder: 'ascend', sorter: (a, b) => b.floor - a.floor });
    col.push({ title: '单元号', dataIndex: 'unit', key: 'unit',
      children: [
        { title: '号码', dataIndex: 'unitName', key: 'unitName',
          children: [
            {
              title: <span onClick={::this.hanglieClickQuan} style={{ color: '#ffffff', cursor: 'pointer' }}>全部调整</span>,
              dataIndex: 'ctrl',
              key: 'ctrl',
              render: (text, record) => (
                <span onClick={this.hanglieClick.bind(this, record)} style={{ color: '#438ACC', cursor: 'pointer', display: 'block'}}>整行调整</span>
              )
            }
          ]
        }
      ]
    });
    let zhenglieDisplay = '1314';
    let titleValue;
    let isroomnoLing = 0;
    for (var i = 0; i < room.length; i++) {
      for (var xppItem in room[i]) {
        if ((typeof room[i][xppItem]=='object')) {
          if (room[i][xppItem].roomno=='01' || room[i][xppItem].roomno=='02' || room[i][xppItem].roomno=='03' || isNaN(room[i][xppItem].roomno)==true) {
            isroomnoLing = 1;
            break;
          }
        }
      }
    }
    unit.forEach((x) => {
      const child = x.rooms;
      const arr = [];
      child.forEach((i) => {
        i = isroomnoLing==1 ? i : parseInt(i)
        const lieNo = x.unit + i
        // console.log('log8080 addNumber--JIESHOU--', addNumber);
        if (addNumber.length == 0) {
          titleValue = i
          zhenglieDisplay = '整列调整'
          // console.log('log8080 if-true222--', titleValue, zhenglieDisplay);
        } else {
          // console.log('log8080 addNumber-----', addNumber);
          if (this.contains(addNumber, i)) {
            titleValue = i
            zhenglieDisplay = '整列调整'
            // console.log('log8080 if-true--', titleValue, zhenglieDisplay);
          } else {
            titleValue = ''
            zhenglieDisplay = ''
            // console.log('log8080 if-f--', titleValue, zhenglieDisplay);
          }
          // console.log('log8080 titleValue--zong', titleValue, zhenglieDisplay);
        }
        arr.push({
          title: titleValue,
          children: [
            {
              title: <span onClick={this.hanglieClickLie.bind(this, lieNo)} style={{ color: '#438ACC', cursor: 'pointer' }}>{zhenglieDisplay}</span>,
              dataIndex: `${x.unit}${i}`,
              key: `${x.unit}${i}`,
              render: (item, record) => {
                if (_isEmpty(item)) {
                  return (<div></div>)
                }
                const displaynone = {
                  display: 'none'
                }
                const displaynoneEd = {
                  display: 'none'
                }
                let sightValue = item.sight;
                let westValue = item.west;
                let isannexeValue = '';
                if (item.isannexe==1) {
                  isannexeValue = '是'
                } else if (item.isannexe==0) {
                  isannexeValue = '否'
                }
                if (displayChanged == item.room && this.state.roomDisplay) {
                  // sightValue = null;
                  // westValue = null;
                  // isannexeValue = null;
                  displaynone.display = 'block';
                }
                if (this.state.roomDisplay==false) {
                  displaynone.display = 'none';
                }
                /*
                // 复式房间判断
                // 由于数据尚未完善，导致页面上的奇葩丑陋，故而注释(放开注释时，注意楼层sorter排序)--2017.11.16
                  const returnData = (
                    <div>
                      <div onClick={this.danyuangeClick.bind(this, item.room)}>
                        <ul onClick={::this.ulClick} style={{ width: '66%' }}>
                          <li>房间:<span style={{ color: '#30AAFF' }}>{item.room}</span></li>
                          <li>景观:<span style={{ color: '#30AAFF' }}>
                            <DictItemDisplay groupId="pj_RoomSight" dictId={sightValue} />
                            <DictItemSelect value={item.sight} onChange={this.sightChange.bind(this, item.room)} style={ displaynone } groupId="pj_RoomSight" />
                          </span></li>
                        <li>朝向:<span style={{ color: '#30AAFF' }}>
                            <DictItemDisplay groupId="pj_RoomWest" dictId={westValue} />
                            <DictItemSelect value={item.west} onChange={this.westChange.bind(this, item.room)} style={ displaynone } groupId="pj_RoomWest" />
                          </span></li>
                          <li>是否附属:<span style={{ color: '#30AAFF' }}>{isannexeValue}
                            <Select allowClear defaultValue={isannexeValue} onChange={this.isannexeValueChange.bind(this, item.room)} style={ displaynone }>
                              <Option value={1}>是</Option>
                              <Option value={0}>否</Option>
                            </Select>
                          </span></li>
                        </ul>
                      </div>
                    </div>
                  )
                  const returnObj = {
                    children: returnData,
                    props: {},
                  };
                  if (item.absolutelyfloor && item.absolutelyfloor!==item.floor) {
                    // item.huxing=='五房复式'
                    returnObj.props.rowSpan = 2;
                  }
                  return (
                    returnObj
                  )
                 */
                return (
                  <div>
                    <div onClick={this.danyuangeClick.bind(this, item.room)}>
                      <ul onClick={::this.ulClick} style={{ width: '66%' }}>
                        <li>房间:<span style={{ color: '#30AAFF' }}>{item.room}</span></li>
                        <li>景观:<span style={{ color: '#30AAFF' }}>
                          <DictItemDisplay groupId="pj_RoomSight" dictId={sightValue} />
                          <DictItemSelect value={item.sight} onChange={this.sightChange.bind(this, item.room)} style={ displaynone } groupId="pj_RoomSight" />
                        </span></li>
                      <li>朝向:<span style={{ color: '#30AAFF' }}>
                          <DictItemDisplay groupId="pj_RoomWest" dictId={westValue} />
                          <DictItemSelect value={item.west} onChange={this.westChange.bind(this, item.room)} style={ displaynone } groupId="pj_RoomWest" />
                        </span></li>
                        <li>是否附属:<span style={{ color: '#30AAFF' }}>{isannexeValue}
                          <Select allowClear defaultValue={isannexeValue} onChange={this.isannexeValueChange.bind(this, item.room)} style={ displaynone }>
                            <Option value={1}>是</Option>
                            <Option value={0}>否</Option>
                          </Select>
                        </span></li>
                      </ul>
                    </div>
                  </div>
                )
              }
            }
          ]
        })
      })
      const obj = {
        title: x.unit,
        children: arr
      }
      col.push(obj)
    })
    this.setState({
      columns: col,
      data: room
    })
  }

  hanglieClick(record, e) {
  	this.setState({
      flooryyVisiblie: record.floor,
      hanglieAll: '1',
  		UpdateHkaddressvisible: true
  	})
  }
  // 整列调整
  hanglieClickLie(lieNo, e) {
    this.setState({
      hanglieAll: '2',
      lieNoValue: lieNo,
  		UpdateHkaddressvisible: true
  	});
  }
  // 全部调整
  hanglieClickQuan(){
    this.setState({
      hanglieAll: '3',
  		UpdateHkaddressvisible: true
  	});
  }
  // 关闭
  modalClose() {
    this.setState({
      UpdateHkaddressvisible: false
    });
  }
  sightCheckedStatusFun(){
    // console.log('this.state.sightCheckedStatus', this.state.sightCheckedStatus);
  }
  sightChange(roomm, value, event) {
    this.setState({
      sightCheckedVue: value,
      sightCheckedStatus: true
    }, function() {
      this.sightCheckedStatusFun()
    })
    const jingguan = {
      room: roomm,
      valuee: value
    }
    this.props.jingGuan(jingguan);
  }

  westChange(roomm, value, event) {
    this.setState({
      westCheckedVue: value,
      westCheckedStatus: true
    })
    const chaoxiang = {
      room: roomm,
      valuee: value
    }
    this.props.chaoXiang(chaoxiang);
  }
  isannexeValueChange(roomm, value, event) {
    this.setState({
      isannexeCheckedVue: value,
      isannexeCheckedStatus: true
    })
    const shifoufushu = {
      room: roomm,
      valuee: value
    }
    this.props.shifouFushu(shifoufushu);
  }
  ulClick(e) {
    e.stopPropagation();
  }
  // 页面点击
  tableClick(dangqianRoom, e) {
    e.stopPropagation();
    this.setState({
      roomDisplay: false
    });
    const canshu = {
      room: dangqianRoom,
      flagg: false
    }
    if ((typeof dangqianRoom)=='string') {
      this.danyuangeChange(canshu);
    }
  }
  dispalyFunction() {
    if (this.state.roomDisplay) {
      this.setState({
        roomDisplay: false
      })
    } else {
      this.setState({
        roomDisplay: true
      })
    }
  }

  danyuangeClick(roomm, e) {
    e.stopPropagation();
    this.props.updateOtherInfoDisplay(roomm);
    const canshushu = {
      room: roomm,
      flagg: false
    }
    if (this.state.roomDisplay) {
      this.setState({
        roomDisplay: false
      }, function() {
        this.stateChangedFunction(canshushu);
      })
    } else {
      this.setState({
        roomDisplay: true
      })
    }
  }
  stateChangedFunction(item) {
    if (this.state.sightCheckedStatus) {
      const params = {
        sight: this.state.sightCheckedVue,
        room: item.room
      }
      this.props.updateOtherInfoDanyuange(params);
    }
    if (this.state.westCheckedStatus) {
      const params = {
        west: this.state.westCheckedVue,
        room: item.room
      }
      this.props.updateOtherInfoDanyuange(params);
    }
    if (this.state.isannexeCheckedStatus) {
      const params = {
        isannexe: this.state.isannexeCheckedVue,
        room: item.room
      }
      this.props.updateOtherInfoDanyuange(params);
    }
    this.setState({
      sightCheckedStatus: false,
      westCheckedStatus: false,
      isannexeCheckedStatus: false
    })
  }
  danyuangeChange(item) {
    if (item.flagg) {
      this.setState({
        roomDisplay: true
      })
    }
    if (this.state.sightCheckedStatus) {
      const params = {
        sight: this.state.sightCheckedVue,
        room: item.room
      }
      this.props.updateOtherInfoDanyuange(params);
    }
    if (this.state.westCheckedStatus) {
      const params = {
        west: this.state.westCheckedVue,
        room: item.room
      }
      this.props.updateOtherInfoDanyuange(params);
    }
    if (this.state.isannexeCheckedStatus) {
      const params = {
        isannexe: this.state.isannexeCheckedVue,
        room: item.room
      }
      this.props.updateOtherInfoDanyuange(params);
    }
    this.setState({
      sightCheckedStatus: false,
      westCheckedStatus: false,
      isannexeCheckedStatus: false
    })
  }
  saveOtherMsg() {
    let roominfo = this.state.data;
    let shouIdArr = [];
    let sightArr = [];
    let westArr = [];
    let isannexeArr = [];
    roominfo.forEach((y) => {
      for (var items in y) {
        if (typeof y[items] == 'object') {
          shouIdArr.push(y[items].roomid);
          sightArr.push(y[items].sight);
          westArr.push(y[items].west);
          isannexeArr.push(y[items].isannexe)
        }
      }
    })
    const changdu = parseInt(shouIdArr.length / 2)
    const shouIdArrIi = shouIdArr.slice(0, changdu)
    const shouIdArrIii = [];
    shouIdArrIii.push(shouIdArr.slice(changdu, -1))
    shouIdArrIii.push(shouIdArr.slice(-1))
    const sightArrIi = sightArr.slice(0, changdu)
    const sightArrIii = [];
    sightArrIii.push(sightArr.slice(changdu, -1))
    sightArrIii.push(sightArr.slice(-1))
    const westArrIi = westArr.slice(0, changdu)
    const westArrIii = [];
    westArrIii.push(westArr.slice(changdu, -1))
    westArrIii.push(westArr.slice(-1))
    const isannexeArrIi = isannexeArr.slice(0, changdu)
    const isannexeArrIii = [];
    isannexeArrIii.push(isannexeArr.slice(changdu, -1))
    isannexeArrIii.push(isannexeArr.slice(-1))
    const params = {
      ids: shouIdArrIi,
      sight: sightArrIi,
      west: westArrIi,
      isannexe: isannexeArrIi,
      flag: 4
    }
    this.props.saveOtherInfo(params)
    const paramss = {
      ids: shouIdArrIii,
      sight: sightArrIii,
      west: westArrIii,
      isannexe: isannexeArrIii,
      flag: 4
    }
    this.props.saveOtherInfo(paramss)
  }
  changeProjBld(value) {
    const params = {
      bldid: value.bldid
    }
    this.props.getXiaokongData(params)
  }
  render() {
    const dangqianRoom = this.props.displayChanged;
    // console.log('```````dangqianRoom```````', dangqianRoom);
    return (
      <div onClick={this.tableClick.bind(this, dangqianRoom)}>
        <div className="TSearchBar">
          <Row>
            <Col span={14}>
              <FormItem label="楼栋" labelCol={{ span: 2 }} wrapperCol={{ span: 14 }}>
                <ProjBldTree changeProjBld={::this.changeProjBld} />
              </FormItem>
            </Col>
          </Row>
        </div>
        <TitleWithTools name="房间列表">
          <Button onClick={::this.saveOtherMsg} type="primary" disabled={hasPermission('roomMgrOther.baocun')} style={{ marginRight: 10 }}>保存</Button>
        </TitleWithTools>
        <Table
          columns={this.state.columns}
          size="middle-reverse"
          bordered
          dataSource={this.state.data}
          pagination={false}
          scroll={{ x: (document.body.clientWidth) * (0.82), y: document.body.clientHeight - 315 }}
          className={`${ThisCss['biaoge-teshu']} InterlacedBg`}
          loading={this.props.loading}
        />
        <ZhenghangDiaozheng modalClose={this.modalClose.bind(this)} lieNoValue={this.state.lieNoValue} hanglieAll={this.state.hanglieAll} flooryyVisiblie={this.state.flooryyVisiblie} visible={this.state.UpdateHkaddressvisible} />
      </div>
    )
  }
}
function mapStateToProps(state, ownProps) {
  return {
    controlData: state.getIn(['projectPre', 'roomMgr', 'controlData']),
    loading: state.getIn(['projectPre', 'roomMgr', 'loading']),
    changeRoomIdArr: state.getIn(['projectPre', 'roomMgr', 'changeRoomIdArr']),
    displayChanged: state.getIn(['projectPre', 'roomMgr', 'displayChanged'])
  }
}
function mapDispatchToProps(dispatch) {
	return {
		...bindActionCreators(action, dispatch)
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(OtherMsg)
