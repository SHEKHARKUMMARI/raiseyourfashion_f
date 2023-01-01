import { ReactNode, useState } from "react";
import { jsx } from "@emotion/react";
import { Box, Button } from "@chakra-ui/react";
import Select, { defaultTheme, StylesConfig } from "react-select";
import AsyncSelect from "react-select/async";

const { colors } = defaultTheme;

const filterColors = (inputValue: string) => {
  return stateOptions.filter((i) =>
    i.label.toLowerCase().includes(inputValue.toLowerCase())
  );
};

const promiseOptions = (inputValue: string) =>
  new Promise<StateOption[]>((resolve) => {
    setTimeout(() => {
      resolve(filterColors(inputValue));
    }, 1000);
  });

export const MyS = () => (
  <AsyncSelect cacheOptions defaultOptions loadOptions={promiseOptions} />
);

const selectStyles: StylesConfig<StateOption, false> = {
  control: (provided) => ({
    ...provided,
    minWidth: 240,
    margin: 8,
  }),
  menu: () => ({ boxShadow: "inset 0 1px 0 rgba(0, 0, 0, 0.1)" }),
};

const MyApp = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState<StateOption | null>();

  return (
    <Dropdown
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      target={
        <Button
          iconAfter={<ChevronDown />}
          onClick={() => setIsOpen((prev) => !prev)}
          isSelected={isOpen}
        >
          {value ? `State: ${value.label}` : "Select a State"}
        </Button>
      }
    >
      <AsyncSelect
        cacheOptions
        defaultOptions
        loadOptions={promiseOptions}
        onChange={(newValue) => {
          setValue(newValue);
          setIsOpen(false);
        }}
        autoFocus
        backspaceRemovesValue={false}
        components={{ DropdownIndicator, IndicatorSeparator: null }}
        styles={selectStyles}
        tabSelectsValue={false}
        value={value}
        controlShouldRenderValue={false}
      />
    </Dropdown>
  );
};

// styled components

const Menu = (props: JSX.IntrinsicElements["div"]) => {
  const shadow = "hsla(218, 50%, 10%, 0.1)";
  return (
    <Box
      style={{
        backgroundColor: "white",
        borderRadius: 4,
        boxShadow: `0 0 0 1px ${shadow}, 0 4px 11px ${shadow}`,
        marginTop: 8,
        position: "absolute",
        zIndex: 2,
      }}
      {...props}
    />
  );
};
const Blanket = (props: JSX.IntrinsicElements["div"]) => (
  <Box
    style={{
      bottom: 0,
      left: 0,
      top: 0,
      right: 0,
      position: "fixed",
      zIndex: 1,
    }}
    {...props}
  />
);
const Dropdown = ({
  children,
  isOpen,
  target,
  onClose,
}: {
  children?: ReactNode;
  readonly isOpen: boolean;
  readonly target: ReactNode;
  readonly onClose: () => void;
}) => (
  <Box style={{ position: "relative" }}>
    {target}
    {isOpen ? <Menu>{children}</Menu> : null}
    {isOpen ? <Blanket onClick={onClose} /> : null}
  </Box>
);
const Svg = (p: JSX.IntrinsicElements["svg"]) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    focusable="false"
    role="presentation"
    {...p}
  />
);
const DropdownIndicator = () => (
  <Box style={{ color: colors.neutral20, height: 24, width: 32 }}>
    <Svg>
      <path
        d="M16.436 15.085l3.94 4.01a1 1 0 0 1-1.425 1.402l-3.938-4.006a7.5 7.5 0 1 1 1.423-1.406zM10.5 16a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11z"
        fill="currentColor"
        fillRule="evenodd"
      />
    </Svg>
  </Box>
);
const ChevronDown = () => (
  <Svg style={{ marginRight: -6 }}>
    <path
      d="M8.292 10.293a1.009 1.009 0 0 0 0 1.419l2.939 2.965c.218.215.5.322.779.322s.556-.107.769-.322l2.93-2.955a1.01 1.01 0 0 0 0-1.419.987.987 0 0 0-1.406 0l-2.298 2.317-2.307-2.327a.99.99 0 0 0-1.406 0z"
      fill="currentColor"
      fillRule="evenodd"
    />
  </Svg>
);
export default MyApp;
