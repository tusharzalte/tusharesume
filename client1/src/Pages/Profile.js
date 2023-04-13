import React, { useState } from "react";
import DefaultLayout from "../Components/DefaultLayout";
import { Button, Form, message, Spin, Tabs } from "antd";
import PersonalInfo from "../Components/PersonalInfo";
import SkillsEducation from "../Components/SkillsEducation";
import ExperienceProjectsAchievements from "../Components/ExperienceProjectsAchievements";
import "../Resources/Stylesheets/profile.css";
import axios from "axios";

const { TabPane } = Tabs;

function Profile() {
  const [loading, setLoading] = useState(false);
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
  return (
    <DefaultLayout>
      {loading && <Spin size="large" />}
      <div className="updateProfile">
        <h4>
          <b>Update Profile</b>
        </h4>
        <hr />
        <Form layout="vertical" onFinish={onFinish} initialValues={user}>
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

          <Button className="updateButton" htmlType="submit">
            UPDATE
          </Button>
        </Form>
      </div>
    </DefaultLayout>
  );
}

export default Profile;
