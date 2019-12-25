import styles from '../Nurse/Schedule/index.less';

//公共方法
export default {
    //攫取日期
    sliceDate: (d) => {
        if(d){
            return d.slice(0,10)
        }
        return "";
    },
    
    //转换政治面貌
    getpoliticalContext: (d) => {
        switch(d){
            case 1:
                return "中共党员";
            case 2: 
                return "共青团员";
            case 3:
                return "无党派人员";
            case 4: 
                return "群众";
            default: return "";
        }
    },

    //转换教育程度
    getEducationContext: (d) => {
        switch(d){
            case 1:
                return "小学";
            case 2: 
                return "初中";
            case 3:
                return "高中";
            case 4: 
                return "中专";
            case 5:
                return "大专";
            case 6: 
                return "本科";
            case 7:
                return "硕士";
            case 8: 
                return "博士";
            default: return "";   
        }
    },

    //转换为性别文本
    getSexContext: (d) => {
        if(d==1){
            return "男";
        }else{
            return "女";
        }
    },

    //转换为证件类型文本
    getCertificateTypeContext: (d) => {
        switch(d){
            case 1:
                return "身份证";
            case 2: 
                return "居住证";
            case 3:
                return "护照"
            case 4: 
                return "台胞证";
            case 5:
                return "军人证";
            default: return "";
            
        }
    },

    //转换为状态文本
    getStatusContext: (d) => {
        switch(d){
            case 1: 
              return "启用";
            case 2: 
              return "停用";
            default: return "";
        }
    },

    //获取排班文本背景色
    getScheduleContextBgColor: (d) => {
        switch(d){
            case "A":
                return "yellow";
            case "D":
                return "blue";
            case "N":
                return "purple";
            case "P":
                return "red";
            case "d":
                return "red";
            case "0/休":
                return "whtie";
            case "休":
                return "white";
            case "干休":
                return "white";
            default: return "transparent";
        }
    },
    
    //获得某年某月下的总天数 
    //2019-11-10
    getMonthDays: (d) => {
        let strYear = d.slice(0,4);
        let strMonth = d.slice(5,7);
        if(strMonth[0]==0){
            strMonth = strMonth.slice(1,2);
        }
        let monthStartDate = new Date(strYear, strMonth-1, 1); 
        let monthEndDate = new Date(strYear, strMonth, 1); 
        let days = (monthEndDate - monthStartDate)/(1000 * 60 * 60 * 24); 
        return days; 
    },

     //根据传入的时间得到星期几
     //d => 2019-11-10
     //day => 10
     getWeek: (d,day) => {
        let i = day;
        let year = d.slice(0,4);
        let month = d.slice(5,7);
        if(month[0]==0){
            month = month.slice(1,2);
        }  
        if(i===undefined) return;
        let c = i.toString();
        if(c.length==1){
            c= "0"+c;
        }
        let a = year+"-"+month+"-"+c;
        let date1 = new Date(a);

        switch(date1.getDay()){
            case 0:
                return "日";
            case 1:
                return "一"; 
            case 2:
                return "二";
            case 3:
                return "三";
            case 4:
                return "四";
            case 5:
                return  "五";
            case 6:
                return "六";
        }

        // let w = this.getWeek1(new Date(a));
        // return w;
    },

    //根据时间判断星期几
    getWeek1: (timedat)=>{  //timedat参数格式：   getWeek（new Date("2017-10-27" )）
        let week;
        switch(timedat.getDay()){
            case 0:
                week = "日";
                break;
            case 1:
                week = "一";
                break; 
            case 2:
                week = "二";
                break;
            case 3:
                week = "三";
                break;
            case 4:
                week = "四";
                break; 
            case 5:
                week = "五";
                break;
            case 6:
                week = "六";
                break;
        }
        return week;  
    },


    //optionItemClassCode: ["d","d1","A","A1"],
    getOptionItemClassCode: (record) =>{
        let optionItemClassCode = ["d","d1","A","A1"];
        let items = [];
            optionItemClassCode.forEach(v => {
                items.push(
                    <Option value={v,record} >{v}</Option>
                )
            });
            return items;
    },


}