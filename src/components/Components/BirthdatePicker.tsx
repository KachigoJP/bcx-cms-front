import React from "react";
import { useTranslation } from "react-i18next";
import moment from "moment";

// UI Imports
import { Col, Form, Row } from "react-bootstrap";

// Apps Import
import { DATE_OPTIONS } from "helpers/constants";

type Props = {
  defaultValue?: string;
  onChange: (value: Date) => void;
};

const Component = React.forwardRef((props: Props, ref) => {
  // Hooks
  const { t } = useTranslation();

  // State
  const [year, setYear] = React.useState(1970);
  const [month, setMonth] = React.useState(1);
  const [day, setDay] = React.useState(0);
  const [dayOptions, setDayOption] = React.useState<number[]>([]);

  React.useEffect(() => {
    const date = props.defaultValue
      ? moment.utc(props.defaultValue)
      : moment().year(1970).startOf("year");
    setYear(date.year());
    setMonth(date.month());
    setDay(date.date());
  }, [props.defaultValue]);

  React.useEffect(() => {
    const maxDayOfMonth = new Date(year, month + 1, 0).getDate();
    const dayArr = Array.from(Array(maxDayOfMonth).keys());
    setDayOption(dayArr);
    onChange();
  }, [year, month]);

  React.useEffect(() => {
    onChange();
  }, [day]);

  const onChange = () => {
    const value = moment().year(year).month(month).date(day).startOf("day");
    props.onChange(value.toDate());
  };

  // Method
  const onChangeYear = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setYear(parseInt(event.target.value));
  };
  const onChangeMonth = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setMonth(parseInt(event.target.value));
  };
  const onChangeDay = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setDay(parseInt(event.target.value));
  };

  return (
    <Row className="mb-3">
      <Col xs={12} md={3}>
        <Form.Group className="mb-3  d-flex align-items-center">
          <Form.Select
            className="ms-1"
            value={year}
            onChange={onChangeYear}
            // {...register('country', { required: true })}
          >
            {DATE_OPTIONS.YEARS.map((idx) => {
              return (
                <option key={idx} value={idx}>
                  {idx}
                </option>
              );
            })}
          </Form.Select>
        </Form.Group>
      </Col>
      <Col xs={12} md={3}>
        <Form.Group className="mb-3  d-flex align-items-center">
          <Form.Select className="ms-1" value={month} onChange={onChangeMonth}>
            {DATE_OPTIONS.MONTHS.map((idx) => {
              return (
                <option key={idx} value={idx}>
                  {idx + 1}
                </option>
              );
            })}
          </Form.Select>
        </Form.Group>
      </Col>
      <Col xs={12} md={3}>
        <Form.Group className="mb-3 d-flex align-items-center">
          <Form.Select className="ms-1" value={day} onChange={onChangeDay}>
            {dayOptions.map((idx) => {
              return (
                <option key={idx} value={idx + 1}>
                  {idx + 1}
                </option>
              );
            })}
          </Form.Select>
        </Form.Group>
      </Col>
    </Row>
  );
});

export default Component;
