import React from 'react';
import styled from 'styled-components';

const FilterContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: #f8f8f8;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
`;

const FilterLabel = styled.label`
  font-size: 16px;
  font-weight: bold;
  margin-right: 16px;
  color: #333333;
`;

const OptionLabel = styled.label`
  display: inline-flex;
  align-items: center;
  margin-right: 12px;
  padding: 8px 12px;
  border-radius: 24px;
  background-color: #ffffff;
  color: #333333;
  cursor: pointer;
  transition: background-color 0.3s ease;
  font-size: 14px;

  &:hover {
    background-color: #f1f1f1;
  }
`;

const FilterCheckbox = styled.input`
  display: none;

  &:checked + ${OptionLabel} {
    background-color: #333333;
    color: #ffffff;

    &:hover {
      background-color: #111111;
    }
  }
`;

const Filter: React.FC = () => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Handle filter change
  };

  return (
    <FilterContainer>
      <FilterLabel>Filters:</FilterLabel>
      <OptionLabel>
        <FilterCheckbox type="checkbox" onChange={handleChange} />
        All
      </OptionLabel>
      <OptionLabel>
        <FilterCheckbox type="checkbox" onChange={handleChange} />
        Laptop
      </OptionLabel>
      <OptionLabel>
        <FilterCheckbox type="checkbox" onChange={handleChange} />
        Watch
      </OptionLabel>
      <OptionLabel>
        <FilterCheckbox type="checkbox" onChange={handleChange} />
        Phones
      </OptionLabel>
      <OptionLabel>
        <FilterCheckbox type="checkbox" onChange={handleChange} />
        AirBuds
      </OptionLabel>
      {/* Add more options here */}
    </FilterContainer>
  );
};

export default Filter;
