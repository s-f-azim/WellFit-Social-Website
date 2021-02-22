import Head from "next/head";
import TestElement from "../components/Navbar2";
import React, {Component} from 'react'
import { Button } from "antd";
import Layout from "antd/lib/layout/layout";


const user = {
  name: "Oskar",
  age: 13,
  occupation: "Test"
};

export default function Home() {
  return (
    <Layout>
      <TestElement user={null} />
    </Layout>
  );
}


