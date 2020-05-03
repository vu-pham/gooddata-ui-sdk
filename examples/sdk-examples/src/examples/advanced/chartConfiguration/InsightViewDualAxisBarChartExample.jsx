// (C) 2007-2020 GoodData Corporation
import React, { Component } from "react";

import { InsightView } from "@gooddata/sdk-ui-ext";

import { workspace } from "../../../constants/fixtures";
import { Ldm } from "../../../ldm";

export class insightViewDualAxisBarChartExample extends Component {
    render() {
        // const config = {
        //     secondary_xaxis: {
        //         visible: true,
        //         labelsEnabled: true,
        //         rotation: "auto",
        //         min: "-75000000",
        //         max: "75000000",
        //         measures: [totalSalesLocalIdentifier],
        //     },
        //     xaxis: {
        //         visible: true,
        //         labelsEnabled: true,
        //         rotation: "auto",
        //         min: "-75000000",
        //         max: "75000000",
        //         measures: [totalCostsLocalIdentifier],
        //     },
        // };

        return (
            <div style={{ height: 300 }} className="s-insightView-dual-axis-bar">
                <InsightView
                    workspace={workspace}
                    insight={Ldm.Insights.DualAxisBarChart}
                    // config={config}
                />
            </div>
        );
    }
}

export default insightViewDualAxisBarChartExample;
