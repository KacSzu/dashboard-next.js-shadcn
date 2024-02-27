import ButtonGroup from "./ButtonGroup";

function OrdersFilter() {
  const FILTER_BUTTONS = [
    { title: "abc", value: "" },
    { title: "abc", value: "" },
    { title: "abc", value: "" },
    { title: "abc", value: "" },
  ];

  return (
    <div className="mx-[12px] my-4 flex justify-end">
      <ButtonGroup data={FILTER_BUTTONS} />
    </div>
  );
}

export default OrdersFilter;
