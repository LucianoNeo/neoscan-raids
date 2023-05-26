import { MultiselectCombobox } from "@twilio-paste/core";
import { Box } from "@twilio-paste/core/box";
import { Text } from "@twilio-paste/core/text";
import { useState, useMemo } from "react";
import raidLevels from "../constants/raidLevels";

const items = raidLevels

function getFilteredComponents(inputValue) {
    const lowerCasedInputValue = inputValue.toLowerCase();
  
    return items.filter(function filterComponents(component) {
      return (
        component.level.toString().toLowerCase().includes(lowerCasedInputValue) ||
        component.name.toLowerCase().includes(lowerCasedInputValue)
      );
    });
  }

const SampleEmptyState = () => (
  <Box paddingY="space40" paddingX="space50">
    <Text as="span" fontStyle="italic" color="colorTextWeak">
      Sem resultado.
    </Text>
  </Box>
);

export const MultiSelectLevels = (props) => {
  const [inputValue, setInputValue] = useState("");
  const filteredItems = useMemo(
    () => getFilteredComponents(inputValue),
    [inputValue]
  );

  return (
    <MultiselectCombobox
      maxHeight={80}
      labelText=""
      selectedItemsLabelText="Selected Paste components"
      items={filteredItems}
      itemToString={(item) => (item ? item.name : '')}
      optionTemplate={({name, level}) => (
        <Box as="span" display="flex" flexDirection="column">
          <Box as="span">{name}</Box>
          <Box as="span" color="colorTextWeak">{level}</Box>
        </Box>
      )}
      initialSelectedItems={items.slice(4, 5)}
      emptyState={SampleEmptyState}
      onInputValueChange={({ inputValue: newInputValue = "" }) => {
        setInputValue(newInputValue);
      }}
      onSelectedItemsChange={(selectedItems) => {
        const selectedLevels = selectedItems.map((item) => item.level);
        props.onChange(new Set(selectedLevels))
      }}
    />
  );
};
