import Head from "next/head";
import TestElement from "../components/Navbar";
import React, {Component} from 'react'
import { Button } from "antd";




export default function Home() {
  return (
    <div>
      Hello you there
      <Button shape="round" type="primary">
        test
      </Button>
      <TestElement name="Nice" />
    </div>
  );
}


