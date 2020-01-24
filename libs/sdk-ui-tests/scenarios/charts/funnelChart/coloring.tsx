// (C) 2007-2019 GoodData Corporation
import { FunnelChart, IFunnelChartProps } from "@gooddata/sdk-ui";
import { scenariosFor } from "../../../src";
import { BlackColor, CustomColorPalette, CustomPaletteColor, RedColor } from "../../_infra/colors";
import { AmountMeasurePredicate, AttributeElements, WonMeasurePredicate } from "../../_infra/predicates";
import { coloringCustomizer } from "../_infra/coloringVariants";
import { FunnelChartWithArithmeticMeasures, FunnelChartWithMeasureAndViewBy } from "./base";

const colorsAndPalette = scenariosFor<IFunnelChartProps>("FunnelChart", FunnelChart)
    .withVisualTestConfig({ groupUnder: "coloring" })
    .withDefaultTags("vis-config-only", "mock-no-scenario-meta")
    .addScenarios("coloring", FunnelChartWithMeasureAndViewBy, coloringCustomizer);

const colorAssignment = scenariosFor<IFunnelChartProps>("FunnelChart", FunnelChart)
    .withDefaultTags("vis-config-only", "mock-no-scenario-meta")
    .addScenario("assign color to measures", {
        ...FunnelChartWithArithmeticMeasures,
        config: {
            colorPalette: CustomColorPalette,
            colorMapping: [
                {
                    predicate: AmountMeasurePredicate,
                    color: BlackColor,
                },
                {
                    predicate: WonMeasurePredicate,
                    color: CustomPaletteColor,
                },
            ],
        },
    })
    .addScenario("assign color to attributes", {
        ...FunnelChartWithMeasureAndViewBy,
        config: {
            colorPalette: CustomColorPalette,
            colorMapping: [
                {
                    predicate: AttributeElements.Product.WonderKid,
                    color: BlackColor,
                },
                {
                    predicate: AttributeElements.Product.Explorer,
                    color: RedColor,
                },
            ],
        },
    });

export default [colorsAndPalette, colorAssignment];
