import React, { forwardRef, RefObject, useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  CheckboxProps,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  FormControl,
  Text,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";

import { CloseIcon, SettingsIcon } from "@chakra-ui/icons";
import DragAndSort from "./dragandsort";

const WizCheckbox = forwardRef(
  (props: WizCheckboxProps, ref: RefObject<HTMLInputElement>) => {
    const { hasBorder, ...rest } = props;
    return (
      <>
        <Checkbox
          id="sh_1"
          itemID="sh_2"
          ref={ref}
          onChange={(e) => {
            props.onChange?.(e);
          }}
          defaultChecked={true}
          icon={
            <svg
              width="6"
              height="5"
              viewBox="0 0 6 5"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.36364 1L2.36364 4L1 2.63636"
                stroke="white"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          }
          {...rest}
        />
        <style jsx>
          {`
            :global([itemid="sh_2"] .chakra-checkbox__control[data-checked]) {
              background: #5c20cf;
              border: 1px solid #5c20cf;
              border-radius: 2px;
            }
            :global([itemid="sh_2"]
                .chakra-checkbox__control[data-checked][data-disabled]) {
              background: #333333;
              border: 1px solid #333333;
              border-radius: 2px;
              color: #ffffff;
            }
          `}
        </style>
      </>
    );
  }
);

WizCheckbox.defaultProps = {
  hasBorder: false,
};

WizCheckbox.displayName = "WizCheckbox";

export type WizCheckboxProps = CheckboxProps & {
  hasBorder?: boolean;
};

export type QuoteSettingsProps = {
  hiddenCoulmns?: string[];
  setHiddenColumns?: (columns: string[]) => void;
  isQoutesSettingOpen: boolean;
  tableColumnsMetaData?: {
    name: string;
    value: string;
    disabled: boolean;
    isDefault: boolean;
    isVisible: boolean;
  }[];
  onQoutesSettingClose: () => void;
};
function QuoteSettings(props: any): JSX.Element {
  const {
    hiddenCoulmns,
    isQoutesSettingOpen,
    tableColumnsMetaData,
    allColumns,
    sortColumns,
    onQoutesSettingClose,
  } = props;
  const [selectedColumns, setSelectedColumns] = useState([]);
  const submitHandler = (data: any) => {
    const _data = Object.entries(data)?.reduce((acc, [key, value]) => {
      if (value) {
        return [...acc, key];
      }
      return acc;
    }, []);
    setSelectedColumns(_data);
  };
  const { register, handleSubmit } = useForm();
  return (
    <>
      <Drawer
        size="sm"
        isOpen={isQoutesSettingOpen}
        placement="right"
        onClose={onQoutesSettingClose}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader height="80px" borderBottom="1px" borderColor="#DDDDDD">
            <Box
              d="flex"
              w="full"
              alignItems="center"
              justifyContent="space-between"
            >
              <Box d="flex" alignItems="center">
                <SettingsIcon width="14px" height="14px" />
                <Text
                  ml="10px"
                  fontFamily="poppins"
                  fontSize="16px"
                  color="#000000"
                >
                  Column Settings
                </Text>
              </Box>
              <Box>
                <CloseIcon
                  width="12px"
                  height="12px"
                  onClick={onQoutesSettingClose}
                />
              </Box>
            </Box>
          </DrawerHeader>
          <DrawerBody>
            {selectedColumns.length ? (
              <DragAndSort
                columns={selectedColumns}
                onClose={onQoutesSettingClose}
                sortColumns={sortColumns}
              />
            ) : (
              <form onSubmit={handleSubmit(submitHandler)}>
                {tableColumnsMetaData
                  ?.filter(({ isDefault, isVisible }) => isDefault && isVisible)
                  .map((column) => {
                    return (
                      <Box
                        key=""
                        display="flex"
                        justifyContent="space-between"
                        mt="25px"
                      >
                        <FormControl d="flex">
                          <WizCheckbox
                            name={column.value}
                            ref={register}
                            hasBorder={false}
                            defaultChecked={true}
                            isDisabled={column?.disabled}
                          />
                          <Text
                            fontFamily="Poppins"
                            fontStyle="normal"
                            fontWeight={500}
                            fontSize="12px"
                            lineHeight="18px"
                            /* identical to box height */
                            ml="14px"
                            color="#333333"
                          >
                            {column.name}
                          </Text>
                        </FormControl>
                        <Box
                          style={{
                            fontFamily: "Poppins",
                            fontStyle: "normal",
                            fontWeight: 300,
                            fontSize: "10px",
                            lineHeight: "15px",
                            color: "#666666",
                          }}
                        >{`${column?.isDefault ? "default" : ""}`}</Box>
                      </Box>
                    );
                  })}

                <Box
                  w="full"
                  borderBottom="1px dashed #999999"
                  width="120%"
                  ml="-40px"
                  mt="25px"
                ></Box>
                {tableColumnsMetaData
                  ?.filter(
                    ({ isDefault, isVisible }) => !isDefault && isVisible
                  )
                  .map((column) => {
                    return (
                      <Box key="" mt="25px">
                        <FormControl>
                          <WizCheckbox
                            name={column.value}
                            ref={register}
                            hasBorder={false}
                            defaultChecked={
                              hiddenCoulmns?.findIndex(
                                (id) => id === column.value
                              ) === -1
                            }
                            isDisabled={column?.disabled}
                          >
                            <Text
                              fontFamily="Poppins"
                              fontStyle="normal"
                              fontWeight={500}
                              fontSize="12px"
                              lineHeight="18px"
                              ml="14px"
                              /* identical to box height */

                              color="#666666"
                            >
                              {" "}
                              {column.name}
                            </Text>
                          </WizCheckbox>
                        </FormControl>
                      </Box>
                    );
                  })}

                <Button w="full" mt="65px" mb="65px" type="submit">
                  Apply
                </Button>
              </form>
            )}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
export default QuoteSettings;
