// (C) 2020 GoodData Corporation
import { getBulletChartSeries } from "../bulletChartOptions";
import { IColorPalette } from "@gooddata/sdk-model";
import BulletChartColorStrategy from "../../colorStrategies/bulletChart";
import { DataViewFacade } from "@gooddata/sdk-backend-spi";
import { recordedDataView } from "@gooddata/sdk-backend-mockingbird";
import { ReferenceRecordings } from "@gooddata/reference-workspace";
import cloneDeep = require("lodash/cloneDeep");

const getColorStrategy = (colorPalette: IColorPalette, dv: DataViewFacade) =>
    new BulletChartColorStrategy(colorPalette, undefined, undefined, undefined, dv);

const colorPaletteRed: IColorPalette = [
    {
        guid: "0",
        fill: {
            r: 255,
            g: 0,
            b: 0,
        },
    },
];

const colorPaletteBlue: IColorPalette = [
    {
        guid: "0",
        fill: {
            r: 0,
            g: 0,
            b: 255,
        },
    },
];

const PrimaryMeasure = recordedDataView(ReferenceRecordings.Scenarios.BulletChart.PrimaryMeasure);
const PrimaryAndComparative = recordedDataView(
    ReferenceRecordings.Scenarios.BulletChart.PrimaryAndComparativeMeasures,
);
const PrimaryAndTarget = recordedDataView(ReferenceRecordings.Scenarios.BulletChart.PrimaryAndTargetMeasures);
const AllMeasures = recordedDataView(
    ReferenceRecordings.Scenarios.BulletChart.PrimaryTargetAndComparativeMeasures,
);

describe("getBulletChartSeries", () => {
    it.each([
        [colorPaletteRed, PrimaryMeasure],
        [colorPaletteBlue, PrimaryAndComparative],
        [colorPaletteRed, PrimaryAndTarget],
        [colorPaletteBlue, AllMeasures],
    ])("should return expected bullet chart series", (colorPalette: IColorPalette, dv: DataViewFacade) => {
        const colorStrategy = getColorStrategy(colorPalette, dv);
        const measureGroup = dv.measureGroupDescriptor().measureGroupHeader;

        expect(getBulletChartSeries(dv, measureGroup, colorStrategy)).toMatchSnapshot();
    });

    it("should set hidden classname to target series and its y value to 0 if execution value is null", () => {
        const HackedUpNullValue = cloneDeep(
            ReferenceRecordings.Scenarios.BulletChart.PrimaryAndTargetMeasures,
        );
        HackedUpNullValue.execution.dataView_all.data[1][0] = null;

        const dv = recordedDataView(HackedUpNullValue);
        const measureGroup = dv.measureGroupDescriptor().measureGroupHeader;

        const colorStrategy = getColorStrategy(colorPaletteRed, dv);
        const series: any = getBulletChartSeries(dv, measureGroup, colorStrategy);

        expect(series[1].data[0].className).toEqual("hidden-empty-series");
        expect(series[1].data[0].target).toEqual(0);
    });
});