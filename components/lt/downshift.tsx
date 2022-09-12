import React from "react";
import { useSelect } from "downshift";
import { Box, Button, Heading } from "@chakra-ui/react";
const books = [
  { author: "Harper Lee", title: "To Kill a Mockingbird" },
  { author: "Lev Tolstoy", title: "War and Peace" },
  { author: "Fyodor Dostoyevsy", title: "The Idiot" },
  { author: "Oscar Wilde", title: "A Picture of Dorian Gray" },
  { author: "George Orwell", title: "1984" },
  { author: "Jane Austen", title: "Pride and Prejudice" },
  { author: "Marcus Aurelius", title: "Meditations" },
  { author: "Fyodor Dostoevsky", title: "The Brothers Karamazov" },
  { author: "Lev Tolstoy", title: "Anna Karenina" },
  { author: "Fyodor Dostoevsky", title: "Crime and Punishment" },
];
interface Book {
  author?: string;
  title?: string;
}
function Downshift() {
  function itemToString(item: any) {
    return item ? item.title : "";
  }
  const {
    getToggleButtonProps,
    getLabelProps,
    selectedItem,
    isOpen,
    getMenuProps,
    getItemProps,
  } = useSelect({
    items: books,
    itemToString,
    onSelectedItemChange(changes) {
      console.log("onSelected item change function call===", changes);
    },
  });
  return (
    <>
      <div>
        <label {...getLabelProps()}>select your favourite book</label>

        <Button
          {...getToggleButtonProps()}
          display="flex"
          justifyContent="space-between"
        >
          <span>{selectedItem ? selectedItem.title : "Select book"}</span>
          <span>{isOpen ? <>&#8593;</> : <>&#8595;</>}</span>
        </Button>
        <ul {...getMenuProps()}>
          {isOpen &&
            books?.map((book, index) => {
              return (
                <li {...getItemProps({ item: book, index })}>
                  <Box fontWeight={500}>{book.title}</Box>
                  <Box fontWeight={200} fontSize="10px">
                    {book.author}
                  </Box>
                </li>
              );
            })}
        </ul>
      </div>
    </>
  );
}

export default Downshift;
