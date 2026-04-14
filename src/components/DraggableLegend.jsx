import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { useDispatch, useSelector } from "react-redux";
import { setLineOrder, setLineColor } from "../features/forecast/forecastSlice";

const DraggableLegend = () => {

  const dispatch = useDispatch();

  const lineOrder = useSelector((state) => state.forecast.lineOrder) || [];
  const lineColors = useSelector((state) => state.forecast.lineColors) || {};

  const onDragEnd = (result) => {

    if (!result.destination) return;

    const items = Array.from(lineOrder);

    const [moved] = items.splice(result.source.index, 1);

    items.splice(result.destination.index, 0, moved);

    dispatch(setLineOrder(items));
  };

  return (

    <div style={{ width: "220px", margin: "20px" }}>

      <DragDropContext onDragEnd={onDragEnd}>

        <Droppable droppableId="legend">

          {(provided) => (

            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              style={{
                background: "#f4f4f4",
                padding: "10px",
                borderRadius: "8px"
              }}
            >

              {lineOrder.map((line, index) => (

                <Draggable
                  key={line}
                  draggableId={line}
                  index={index}
                >

                  {(provided) => (

                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={{
                        padding: "10px",
                        marginBottom: "8px",
                        background: "white",
                        border: "1px solid #ccc",
                        borderRadius: "5px",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        cursor: "grab",
                        ...(provided.draggableProps?.style || {})
                      }}
                    >

                      <span>{line}</span>

                      <input
                        type="color"
                        value={lineColors[line] || "#000000"}
                        onChange={(e) =>
                          dispatch(
                            setLineColor({
                              line: line,
                              color: e.target.value
                            })
                          )
                        }
                      />

                    </div>

                  )}

                </Draggable>

              ))}

              {provided.placeholder}

            </div>

          )}

        </Droppable>

      </DragDropContext>

    </div>
  );
};

export default DraggableLegend;