import React, { useState } from "react";
import axios from "axios";

import { Button, Form, Modal, message, Spin, Tabs, Row, Col, Input } from "antd";

import DefaultLayout from "../Components/DefaultLayout";
import PersonalInfo from "../Components/PersonalInfo";
import SkillsEducation from "../Components/SkillsEducation";
import ExperienceProjectsAchievements from "../Components/ExperienceProjectsAchievements";

import { extractExperienceProjectsAchievements, extractPersonalInfo, extractSkillsEducation } from '../Helpers/linkedinExtractors';

import "../Resources/Stylesheets/profile.css";

const { TabPane } = Tabs;
const { useForm, Item } = Form;

function Profile() {
  const [loading, setLoading] = useState(false);
  const [form] = useForm();
  const [linkedInForm] = useForm();
  const [linkedinLoading, setLinkedinLoading] = useState(false);
  const [linkedInPromptShown, setLinkedInPromptShown] = useState(false);

  const user = JSON.parse(localStorage.getItem("tusharresume-users"));
  const onFinish = async (values) => {
    setLoading(true);
    try {
      const result = await axios.post("api/user/update", {
        ...values,
        _id: user._id,
      });
      localStorage.setItem("tusharresume-users", JSON.stringify(result.data));
      setLoading(false);
      message.success("Profile updated successfully");
    } catch (error) {
      setLoading(false);
      message.error("Registration failed");
    }
  };

  const extractFromLinkedin = async (formValues) => {
    try {
      setLinkedinLoading(true);
      const result = (await axios.get(`api/user/screenshot?username=${formValues.username}`)).data;
      const dataWithScript = (result || '').match(/<script type="application\/ld\+json">\n\s+.*\n\s+<\/script>/)[0];
      const strUserData = (dataWithScript || '').replace(/<(\/|)script.*>/g, '');

      const userData = JSON.parse(strUserData)['@graph'][0];
      
      extractPersonalInfo(userData, form);
      extractSkillsEducation(userData, form);
      extractExperienceProjectsAchievements(userData, form);
    } catch (error) {
      console.error(error);
    } finally {
      linkedInForm.resetFields();
      setLinkedInPromptShown(false);
      setLinkedinLoading(false);
    }
  }

  return (
    <DefaultLayout>
      {loading && <Spin size="large" />}
      <div className="updateProfile">
        <Row justify="space-between">
          <Col>
            <h4>
              <b>Update Profile</b>
            </h4>
          </Col>
          <Col span="auto">
            <h4>
              <Button className="primaryBtn" onClick={() => setLinkedInPromptShown(true)}>
                FILL USING LINKEDIN
              </Button>
            </h4>
          </Col>
        </Row>
        <hr />
          <Modal
            visible={linkedInPromptShown}
            closable={!linkedinLoading}
            onCancel={() => {
              linkedInForm.resetFields();
              setLinkedInPromptShown(false);
            }}
            okButtonProps={{
              onClick: () => linkedInForm.submit(),
              loading: linkedinLoading,
            }}
            cancelButtonProps={{
              htmlType: 'button',
              disabled: linkedinLoading,
            }}
          >
            <Form form={linkedInForm} layout="vertical" onFinish={extractFromLinkedin}>
              <Item name="username" label="LinkedIn Username" rules={[
                { required: true, message: "Missing username" },
              ]}>
                <Input disabled={linkedinLoading} />
              </Item>
            </Form>
          </Modal>
        <Form form={form} layout="vertical" onFinish={onFinish} initialValues={user}>
          <Tabs defaultActiveKey="1">
            <TabPane tab="Personal Info" key="1">
              <PersonalInfo />
            </TabPane>
            <TabPane tab="Skills / Education" key="2">
              <SkillsEducation />
            </TabPane>
            <TabPane tab="Experience / Projects / Achievements" key="3">
              <ExperienceProjectsAchievements />
            </TabPane>
          </Tabs>

          <Button className="updateButton primaryBtn" htmlType="submit">
            UPDATE
          </Button>
        </Form>
      </div>
    </DefaultLayout>
  );
}

export default Profile;
