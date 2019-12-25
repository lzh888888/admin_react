
import React, { PureComponent } from 'react';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';




export default class extends PureComponent {
    constructor(props){
        super(props);
        this.state = {
        }
    }

    render(){
        let resprops ={
            tabList: [{tab:"Details",key:"1"},{tab:"Rule",key:"2"}]
        }
        return(
            <PageHeaderLayout {...resprops} >
                医生排班信息
            </PageHeaderLayout>
        );
    }
}