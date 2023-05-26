import React from "react";
import { Form, Input, Button } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { useState } from "react";
import universities from "./universities";


// Predefined list of universities

function SkillsEducation() {
  // State to store the filtered universities
  const [filteredUniversities, setFilteredUniversities] = useState([]);
  // State to store the selected university
  const [selectedUniversity, setSelectedUniversity] = useState("");

  // Handle input change for university filtering
  const handleUniversityFilter = (inputValue) => {
    setSelectedUniversity(inputValue); // Update the selected university
    if (inputValue) {
      const filtered = universities.filter((university) =>
        university.toLowerCase().includes(inputValue.toLowerCase())
      );
      setFilteredUniversities(filtered);
    } else {
      setFilteredUniversities([]);
    }
  };

  // Handle university selection
  const handleUniversitySelect = (university) => {
    setSelectedUniversity(university);
    setFilteredUniversities([]);
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
                      rules={[
                        { required: true, message: "Missing qualification" },
                      ]}
                    >
                      <Input placeholder="Qualification" />
                    </Form.Item>
                  </div>

                  <div className="col-md-2">
                    <Form.Item
                      {...restField}
                      name={[name, "percentage"]}
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
                      rules={[
                        { required: true, message: "Missing institution name" },
                      ]}
                    >
                      <Input
                        placeholder="Institution"
                        onChange={(e) => handleUniversityFilter(e.target.value)}
                        value={selectedUniversity}
                      />
                      {filteredUniversities.length > 0 && (
                        <ul
                          style={{
                            listStyle: "none",
                            padding: 0,
                            margin: 0,
                            position: "absolute",
                            backgroundColor: "#ffffff",
                            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
                            borderRadius: "4px",
                            zIndex: 999,
                            maxHeight: "200px",
                            overflowY: "auto",
                            width: "100%",
                          }}
                        >
                          {filteredUniversities.map((university) => (
                            <li
                              key={university}
                              style={{
                                padding: "8px 16px",
                                cursor: "pointer",
                                transition: "background-color 0.3s ease",
                              }}
                              onClick={() => handleUniversitySelect(university)}
                              onMouseEnter={(e) =>
                                (e.target.style.backgroundColor = "#e6f7ff")
                              }
                              onMouseLeave={(e) =>
                                (e.target.style.backgroundColor = "transparent")
                              }
                            >
                              {university}
                            </li>
                          ))}
                        </ul>
                      )}
                    </Form.Item>
                  </div>

                  <div className="col-md-2">
                    <Form.Item
                      {...restField}
                      name={[name, "yearRange"]}
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
