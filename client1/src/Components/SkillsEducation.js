import React from "react";
import { Form, Input, Button, AutoComplete } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { useState } from "react";
import universities from "./universities";
import educational_qualifications from "./educational_qualifications";

function SkillsEducation() {
  const [form] = Form.useForm();
  const [filteredUniversities, setFilteredUniversities] = useState([]);
  const [selectedUniversity, setSelectedUniversity] = useState("");
  const [filteredqualifications, setFilteredqualifications] = useState([]);
  const [selectedqualifications, setSelectedqualifications] = useState("");


  // Handle input change for university filtering
  const handleUniversityFilter = (inputValue) => {
    setSelectedUniversity(inputValue); // Update the selected university
    if (inputValue) {
      const filtered = universities.filter((university) =>
        university.toLowerCase().startsWith(inputValue.toLowerCase())
      );
      setFilteredUniversities(filtered);
    } else {
      setFilteredUniversities([]);
    }
  };

  const handlequaliFilter = (inputValue) => {
    setSelectedqualifications(inputValue); // Update the selected university
    if (inputValue) {
      const fil = educational_qualifications.filter((qualification) =>
        qualification.toLowerCase().startsWith(inputValue.toLowerCase())
      );
      setFilteredqualifications(fil);
    } else {
      setFilteredqualifications([]);
    }
  };

  // Handle university selection
  const handleUniversitySelect = (university) => {
    setSelectedUniversity(university);
    setFilteredUniversities([]);
    form.setFieldsValue({ institution: university });
  };

  const handlequaliSelect = (qual) => {
    setSelectedqualifications(qual);
    setFilteredqualifications([]);
    form.setFieldsValue({ qualification: qual });
  };


  return (
    <div>
      <h5>
        <b>Education</b>
      </h5>
      <hr />
      <Form.List name="education">
        {(fields, { add, remove }) => (
          <>
            <div className="row">
              {fields.map(({ key, name, ...restField }) => (
                <>
                 <div className="col-md-3">
  <Form.Item
    {...restField}
    name={[name, "qualification"]}
    label="Qualification"
    rules={[
      { required: true, message: "Missing qualification" },
    ]}
    
  >
    <AutoComplete
      placeholder="Qualification"
      onChange={handlequaliFilter}
      value={selectedqualifications}
      onBlur={() => {
        if (!selectedqualifications) {
          form.validateFields([`${name}.qualification`]);
        }
      }}
     
    >
      {filteredqualifications.map((qualification) => (
        <AutoComplete.Option
          key={qualification}
          value={qualification}
          onMouseEnter={() => {
            setSelectedqualifications(qualification);
          }}
          onMouseLeave={() => {
            setSelectedqualifications("");
          }}
          onClick={() => {
            handlequaliSelect(qualification);
          }}
        >
          {qualification}
        </AutoComplete.Option>
      ))}
    </AutoComplete>
  </Form.Item>
</div>

                  <div className="col-md-2">
                    <Form.Item
                      {...restField}
                      name={[name, "percentage"]}
                      label="Percentage"
                      rules={[
                        { required: true, message: "Missing percentage" },
                      ]}
                    >
                      <Input placeholder="Percentage" />
                    </Form.Item>
                  </div>

                  <div className="col-md-3">
                    <Form.Item
                      {...restField}
                      name={[name, "institution"]}
                      label="Institution"
                      rules={[
                        { required: true, message: "Missing institution name" },
                      ]}
                    >
                      <AutoComplete
                        placeholder="Institution"
                        onChange={handleUniversityFilter}
                        value={selectedUniversity}
                        onBlur={() => {
                          if (!selectedUniversity) {
                            form.validateFields([`${name}.institution`]);
                          }
                        }}
                      >
                        {filteredUniversities.map((university) => (
                          <AutoComplete.Option
                            key={university}
                            value={university}
                            onMouseEnter={() => {
                              setSelectedUniversity(university);
                            }}
                            onMouseLeave={() => {
                              setSelectedUniversity("");
                            }}
                            onClick={() => {
                              handleUniversitySelect(university);
                            }}
                          >
                            {university}
                          </AutoComplete.Option>
                        ))}
                      </AutoComplete>
                    </Form.Item>
                  </div>

                  <div className="col-md-2">
                    <Form.Item
                      {...restField}
                      name={[name, "yearRange"]}
                      label="Year Range"
                      rules={[
                        { required: true, message: "Missing year range" },
                      ]}
                    >
                      <Input placeholder="Year Range" />
                    </Form.Item>
                  </div>
                  <div className="col-md-2">
                    <MinusCircleOutlined
                      style={{ fontSize: 25, color: "tomato" }}
                      onClick={() => remove(name)}
                    />
                  </div>
                </>
              ))}
            </div>

            <Form.Item>
              <Button
                type="dashed"
                onClick={() => add()}
                block
                icon={<PlusOutlined />}
              >
                Add Education
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
      <h5>
        <b>Skills</b>
      </h5>
      <hr />
      <Form.List name="skills">
        {(fields, { add, remove }) => (
          <>
            <div className="row">
              {fields.map(({ key, name, ...restField }) => (
                <>
                  <div className="col-md-4">
                    <Form.Item
                      {...restField}
                      name={[name, "technology"]}
                      label="Technology"
                      rules={[
                        { required: true, message: "Missing technology" },
                      ]}
                    >
                      <Input placeholder="Technology" />
                    </Form.Item>
                  </div>
                  <div className="col-md-2">
                    <MinusCircleOutlined
                      style={{ fontSize: 25, color: "tomato" }}
                      onClick={() => remove(name)}
                    />
                  </div>
                </>
              ))}
            </div>

            <Form.Item>
              <Button
                type="dashed"
                onClick={() => add()}
                block
                icon={<PlusOutlined />}
              >
                Add Skill
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
    </div>
  );
}

export default SkillsEducation;
