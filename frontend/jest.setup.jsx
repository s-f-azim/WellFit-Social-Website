/* eslint-disable react/destructuring-assignment */
import '@testing-library/jest-dom/extend-expect';

jest.mock('next/config', () => () => ({
  publicRuntimeConfig: {
    APP_NAME: 'instaFit',
    API_DEVELOPMENT: `http://localhost:4000/api`,
    API_PRODUCTION: `http://localhost:4000/api`,
    PRODUCTION: false,
  },
}));

jest.mock('antd', () => {
  const antd = jest.requireActual('antd');

  const Select = (props) => {
    const multiple = ['tags', 'multiple'].includes(props.mode);

    return (
      <select
        aria-label={props['aria-label']}
        value={props.value}
        defaultValue={props.defaultValue}
        multiple={multiple}
        disabled={props.disabled}
        data-testid={props['data-testid']}
        className={props.className}
        onChange={(e) =>
          props.onChange(
            multiple
              ? Array.from(e.target.selectedOptions).map((option) => option.value)
              : e.target.value
          )
        }
      >
        {props.children}
      </select>
    );
  };

  Select.Option = ({ children, ...otherProps }) => <option {...otherProps}>{children}</option>;
  Select.OptGroup = ({ children, ...otherProps }) => (
    <optgroup {...otherProps}>{children}</optgroup>
  );

  return { ...antd, Select };
});

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});
