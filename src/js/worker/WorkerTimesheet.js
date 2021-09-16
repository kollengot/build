
import React, { Component } from 'react';

import { ScheduleComponent, Day, Week, WorkWeek, Month, Agenda, Inject } from '@syncfusion/ej2-react-schedule';

class WorkerSchedule extends Component {
    state = {
       
    }
    constructor(props) {
        super(props);
        
    }
    render() {
        return (
            <div className="col admin-list-page" id="operations-page">
            <ScheduleComponent>
    <Inject services={[Day, Week, WorkWeek, Month, Agenda]}/>
</ScheduleComponent>
</div>
        );
    }
}
export default WorkerSchedule;