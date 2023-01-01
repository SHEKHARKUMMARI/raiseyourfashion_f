import { Box, Button } from "@chakra-ui/react";
import React, { useRef, useState } from "react";

function DragAndSort(props: any) {
  const { columns: p_Columns, sortColumns, onClose } = props;
  const [columns, setColumns] = useState(() => {
    return [...p_Columns];
  });
  const dragItem = useRef<number | null>(null);
  const dragOverItem = useRef<number | null>(null);
  const handleSortColumns = () => {
    let _columns = [...columns];

    const draggedColumn = _columns.splice(dragItem.current as number, 1)[0];
    _columns.splice(dragOverItem.current as number, 0, draggedColumn);
    dragItem.current = null;
    dragOverItem.current = null;
    setColumns([..._columns]);
  };
  const handleSubmit = () => {
    sortColumns([...columns]);
    onClose();
  };

  return (
    <>
      {columns?.map((item, index) => {
        return (
          <Box
            key={index}
            d="flex"
            border="1px solid  black"
            w="50%"
            justifyContent={"space-between"}
          >
            <Box
              draggable={true}
              border="1px dashed red"
              w="90%"
              onDragStart={() => (dragItem.current = index)}
              onDragEnter={() => (dragOverItem.current = index)}
              onDragEnd={handleSortColumns}
              onDragOver={(e) => e.preventDefault()}
            >
              {item}
            </Box>
            <Box>{`column ${index + 1}`} </Box>
          </Box>
        );
      })}
      <Button onClick={() => handleSubmit()}>submit</Button>
    </>
  );
}

export default DragAndSort;
