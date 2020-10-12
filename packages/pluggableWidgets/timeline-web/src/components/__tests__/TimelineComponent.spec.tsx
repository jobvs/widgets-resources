import { shallow } from "enzyme";
import { createElement } from "react";
import { actionValue, EditableValueBuilder } from "@widgets-resources/piw-utils";
import TimelineComponent, { getGroupHeaderByType, TimelineComponentProps } from "../TimelineComponent";
import { BasicItemType, CustomItemType } from "../../Timeline";

jest.mock("mendix/components/web/Icon", () =>
    jest.requireActual("../../__tests__/__mocks__/mendix/components/web/Icon")
);

describe("Timeline", () => {
    const basicData = new Map<string, BasicItemType[]>();
    const customData = new Map<string, CustomItemType[]>();

    const basicItem: BasicItemType = {
        description: "Basic description",
        eventDateTime: "Basic event Time",
        title: "Basic title"
    };

    const basicItemWithIcon: BasicItemType = {
        ...basicItem,
        icon: { type: "image", iconUrl: "iconUrl" }
    };

    const customItem: CustomItemType = {
        groupHeader: <p>Day Divider</p>,
        title: <p>Title</p>,
        eventDateTime: <p>Date Time</p>,
        description: <p>Description</p>
    };

    const customItemWithIcon: CustomItemType = {
        ...customItem,
        icon: <img src="customIcon" />
    };

    basicData.set(new Date(1453, 4, 29).toDateString(), [basicItem, basicItemWithIcon]);
    customData.set(new Date(1453, 4, 29).toDateString(), [customItem, customItemWithIcon]);

    const basicRenderProps: TimelineComponentProps = {
        data: basicData,
        renderMode: "basic",
        showGroupHeader: true
    };
    const customRenderProps: TimelineComponentProps = {
        data: customData,
        renderMode: "custom",
        showGroupHeader: true
    };

    it("renders timeline with basic configuration", () => {
        const component = shallow(<TimelineComponent {...basicRenderProps} />);
        expect(component).toMatchSnapshot();
    });
    it("renders timeline with custom configuration ", () => {
        const component = shallow(<TimelineComponent {...customRenderProps} />);
        expect(component).toMatchSnapshot();
    });
    it("hides the timeline header", () => {
        const component = shallow(<TimelineComponent {...basicRenderProps} showGroupHeader={false} />);
        expect(component).toMatchSnapshot();
    });

    it("calls correct formatter with fulldate", () => {
        const date = new EditableValueBuilder<Date>().withValue(new Date(1453, 4, 29)).build();
        getGroupHeaderByType(date.formatter, new Date(1453, 4, 30), "fullDate");

        expect((date.formatter as any).withConfig).toBeCalledWith({ type: "date" });
    });

    it("calls correct formatter with day", () => {
        const date = new EditableValueBuilder<Date>().withValue(new Date(1453, 4, 29)).build();
        getGroupHeaderByType(date.formatter, new Date(1453, 4, 30), "day");

        expect((date.formatter as any).withConfig).toBeCalledWith({ type: "date" });
    });

    it("calls correct formatter with dayName", () => {
        const date = new EditableValueBuilder<Date>().withValue(new Date(1453, 4, 29)).build();
        getGroupHeaderByType(date.formatter, new Date(1453, 4, 30), "dayName");

        expect((date.formatter as any).withConfig).toBeCalledWith({ type: "custom", pattern: "EEEE" });
    });

    it("calls correct formatter with dayMonth", () => {
        const date = new EditableValueBuilder<Date>().withValue(new Date(1453, 4, 29)).build();
        getGroupHeaderByType(date.formatter, new Date(1453, 4, 30), "dayMonth");

        expect((date.formatter as any).withConfig).toBeCalledWith({ type: "custom", pattern: "EE MMMM" });
    });

    it("calls correct formatter with month", () => {
        const date = new EditableValueBuilder<Date>().withValue(new Date(1453, 4, 29)).build();
        getGroupHeaderByType(date.formatter, new Date(1453, 4, 30), "month");

        expect((date.formatter as any).withConfig).toBeCalledWith({ type: "custom", pattern: "MMMM" });
    });

    it("calls correct formatter with monthYear", () => {
        const date = new EditableValueBuilder<Date>().withValue(new Date(1453, 4, 29)).build();
        getGroupHeaderByType(date.formatter, new Date(1453, 4, 30), "monthYear");

        expect((date.formatter as any).withConfig).toBeCalledWith({ type: "custom", pattern: "MMM YYYY" });
    });

    it("calls correct formatter with year", () => {
        const date = new EditableValueBuilder<Date>().withValue(new Date(1453, 4, 29)).build();
        getGroupHeaderByType(date.formatter, new Date(1453, 4, 30), "year");

        expect((date.formatter as any).withConfig).toBeCalledWith({ type: "custom", pattern: "YYYY" });
    });

    describe("with action set", () => {
        it("renders with clickable styles", () => {
            const action = actionValue(true, false);
            const basicItemWithAction: BasicItemType = {
                ...basicItem,
                icon: { type: "image", iconUrl: "iconUrl" },
                action
            };
            basicData.set(new Date(2000, 4, 30).toDateString(), [basicItemWithAction]);

            const basicPropsWithAction = { ...basicRenderProps, data: basicData };
            const component = shallow(<TimelineComponent {...basicPropsWithAction} />);

            const clickableItem = component.find(".clickable");

            expect(clickableItem).toHaveLength(1);
            expect(component).toMatchSnapshot();
        });
        it("triggers actions when clicked", () => {
            const action = actionValue(true, false);
            const basicItemWithAction: BasicItemType = {
                ...basicItem,
                icon: { type: "image", iconUrl: "iconUrl" },
                action
            };
            basicData.set(new Date(2000, 4, 30).toDateString(), [basicItemWithAction]);

            const basicPropsWithAction = { ...basicRenderProps, data: basicData };
            const component = shallow(<TimelineComponent {...basicPropsWithAction} />);

            const clickableItem = component.find(".clickable");
            clickableItem.simulate("click");

            expect(action.execute).toBeCalled();
        });
        it("change style when hovered", () => {
            const action = actionValue(true, false);
            const basicItemWithAction: BasicItemType = {
                ...basicItem,
                icon: { type: "image", iconUrl: "iconUrl" },
                action
            };
            basicData.set(new Date(2000, 4, 30).toDateString(), [basicItemWithAction]);

            const basicPropsWithAction = { ...basicRenderProps, data: basicData };
            const component = shallow(<TimelineComponent {...basicPropsWithAction} />);

            const clickableItem = component.find(".clickable");
            clickableItem.simulate("mouseover");

            expect(component).toMatchSnapshot();
        });
    });
});
