// import React from 'react';
// import VCard from './VCard';

// function App() {
//   return (
//     <div>
//       <VCard />
//     </div>
//   );
// }

// export default App;


import React, { useState } from "react";
// import vcardJs from "vcard-js";
import vCardsJS from "vcards-js";
import QRCode from 'qrcode.react';

import { Button, Checkbox, Form, type FormProps, Input, Layout, Flex } from 'antd';
const {Header,Content} = Layout
const onFinish = (values) => {
  console.log('Success:', values);
};
const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
};
function App() {
  //define initialstate
  const initialState = {
    firstName: "",
    middleName: "",
    lastName: "",
    organization: "",
    workPhone: "",
    title: "",
    note: "",
    workEmail: "",
    url: ""
  };
  //use hooks
  const [formState, setState] = useState(initialState);

  //function for downloading the qrcode
  const downloadQRCode = (url, fileName) => {
    fetch(url, {})
      .then(response => response.blob())
      .then(blob => URL.createObjectURL(blob))
      .then(url => {
        const tag = document.createElement("a");
        tag.href = url;
        tag.download = fileName;
        document.body.appendChild(tag);
        tag.click();
        document.body.removeChild(tag);
      });
  };

  //function for textinput changes
  const handleTextChange = e => {
    setState({ ...formState, [e.target.name]: e.target.value });
    //note: did this because the setState was
    //keeping the changed property only.
    //so other properties values was becoming undefined
    //so I spread the full state first, then the changed
    //property just got overwritten
    // TODO:// seek for a better solution
  };

  //create a new vCard
  let vCard = vCardsJS();
  // let ADDR = Addr
  //set properties from state
  vCard.firstName = formState.firstName;
  vCard.middleName = formState.middleName;
  vCard.lastName = formState.lastName;
  vCard.organization = formState.organization;
  vCard.cellPhone = formState.workPhone;
  vCard.title = formState.title;
  vCard.note = formState.note;
  vCard.email = formState.email;
  vCard.workUrl = formState.url;
  // vCard.url = 'https://github.com/enesser';
// vCard.workUrl = 'https://acme-corporation/enesser';
  // vCard.workAddress = "city:tt";

  // vCard.cellPhone = "7778888";
  // vCard.email = "morgan@gmai..com";
  // vCard.gender = "F";
  // vCard.get
  // vCard.homeAddress = "tttttttttt";
  // vCard.role = "manager";

//   vCard.homeAddress.type = 'WORK';
// vCard.homeAddress.street = '123 Main Street';
// vCard.homeAddress.city = 'Chicago';
// vCard.homeAddress.stateProvince = 'IL';
// vCard.homeAddress.postalCode = '12345';
// vCard.homeAddress.countryRegion = 'United States of America';

vCard.workAddress.type = 'WORK';
vCard.workAddress.street = formState.street;
vCard.workAddress.city = formState.city;
vCard.workAddress.stateProvince = formState.state;
vCard.workAddress.postalCode = formState.postcode;
vCard.workAddress.countryRegion = formState.country;
const headerStyle = {
  textAlign: 'center',
  color: '#fff',
  height: 80,
  paddingInline: 20,
  lineHeight: '64px',
  backgroundColor: '#4096ff',
};
const contentStyle = {
  textAlign: 'center',
  minHeight: 20,
  lineHeight: '20px',
  color: '#fff',
  backgroundColor: '#4096ff',
};
const layoutStyle = {
  borderRadius: 8,
  overflow: 'hidden',
  width: 'calc(100% - 8px)',
  maxWidth: 'calc(100% - 8px)',
  margin: 10% 20,
};
const styles = {
  label: {
    maxWidth: '200px',
    textOverflow: 'ellipsis',
  },
};
  // vCard.
  // vCard.birthday =  "20030402";
  //get as formatted string and encode it
  let vCardString = vCard.getFormattedString();
  let vCardEncodedString = encodeURIComponent(vCardString);
  let qrCodeUrl = `https://chart.googleapis.com/chart?chs=300x300&choe=UTF-8&chld=M|0&cht=qr&chl=${vCardEncodedString}`;
  console.log(vCardString);
  //create the jsx
  return (
    <Flex gap="middle" wrap="wrap">
    <Layout style={layoutStyle}>
      <Header style={headerStyle}> <h1 className="text-info text-center">VCard QRCode Generator</h1></Header>
      <Content style={contentStyle}>
      <div className="container form-group col-md-4 d-flex flex-column justify-content-center">
     
      <div>
      <QRCode value={vCardString} />
    
    <div>      <button
        className="btn btn-info"
        onClick={() => downloadQRCode(qrCodeUrl, "qrcode.png")}
      >
        Download the QRCode
      </button>
      </div>

    </div>
<div style={{ display: 'block', justifyContent: 'center' , marginLeft: 100, marginTop: 20}}>
      <Form
    name="basic"
    labelCol={{
      span: 12,
    }}
    wrapperCol={{
      span: 12,
    }}
    style={{
      maxWidth: 800,
    }}
    initialValues={{
      remember: true,
    }}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
  >
    <Form.Item
      label="First Name"
      name="firstName"
      rules={[
        {
          required: true,
          message: 'Please input your username!',
        },
      ]}
    >
   <Input
        className="form-control"
        type="text"
        name="firstName"
        placeholder="First Name"
        onKeyUp={handleTextChange}
      />
    </Form.Item>

    <Form.Item
      label="Middle Name"
      name="middleName"
      rules={[
        {
          required: true,
          message: 'Please input your username!',
        },
      ]}
    >
       <Input
        label="middleName"
        className="form-control"
        type="text"
        name="middleName"
        placeholder="Middle Name"
        onKeyUp={handleTextChange}
      />
    </Form.Item>
    <Form.Item
      label="Last Name"
      name="lastName"
      rules={[
        {
          required: true,
          message: 'Please input your username!',
        },
      ]}
    >
       <Input
        label="lastName"
        className="form-control"
        type="text"
        name="lastName"
        placeholder="Last Name"
        onKeyUp={handleTextChange}
      />
    </Form.Item>

    <Form.Item
      label="Organization"
      name="organization"
    >
       <Input
        label="organization"
        className="form-control"
        type="text"
        name="organization"
        placeholder="Organization"
        onKeyUp={handleTextChange}
      />
    </Form.Item>

    <Form.Item
      label="Title"
      name="title"
    >
       <Input
        label="title"
        className="form-control"
        type="text"
        name="title"
        placeholder="Title"
        onKeyUp={handleTextChange}
      />
    </Form.Item>

    <Form.Item
      label="Role"
      name="role"
    >
       <Input
        label="role"
        className="form-control"
        type="text"
        name="role"
        placeholder="Role"
        onKeyUp={handleTextChange}
      />
    </Form.Item>

    <Form.Item
      label="Work Phone"
      name="workPhone"
    >
       <Input
        label="Work Phone"
        className="form-control"
        type="text"
        name="workPhone"
        placeholder="Phone (work)"
        onKeyUp={handleTextChange}
      />
    </Form.Item>

    
    <Form.Item
      label="Email"
      name="email"
    >
       <Input
        label="Email"
        className="form-control"
        type="text"
        name="email"
        placeholder="Email"
        onKeyUp={handleTextChange}
      />
    </Form.Item>

    <Form.Item
      label="Website"
      name="url"
    >
       <Input
        label="Website"
        className="form-control"
        type="text"
        name="url"
        placeholder="Website"
        onKeyUp={handleTextChange}
      />
    </Form.Item>

    <Form.Item
      label="WorkAddress Street"
      name="street"
    >
       <Input
        label="WorkAddress Street"
        className="form-control"
        type="text"
        name="street"
        placeholder="WorkAddress Street"
        onKeyUp={handleTextChange}
      />
    </Form.Item>
    
    <Form.Item
      label="WorkAddress City"
      name="city"
    >
       <Input
        label="WorkAddress City"
        className="form-control"
        type="text"
        name="city"
        placeholder="WorkAddress City"
        onKeyUp={handleTextChange}
      />
    </Form.Item>
    
    <Form.Item
      label="WorkAddress stateProvince"
      name="state"
    >
       <Input
        label="WorkAddress stateProvince"
        className="form-control"
        type="text"
        name="state"
        placeholder="WorkAddress stateProvince"
        onKeyUp={handleTextChange}
      />
    </Form.Item>
    
    <Form.Item
      label="WorkAddress postalCode"
      name="postcode"
    >
       <Input
        label="WorkAddress postalCode"
        className="form-control"
        type="text"
        name="postcode"
        placeholder="WorkAddress postalCode"
        onKeyUp={handleTextChange}
      />
    </Form.Item>
    
    <Form.Item
      label="WordAddress CountryRegion"
      name="country"
    >
       <Input
        label="WordAddress CountryRegion"
        className="form-control"
        type="text"
        name="country"
        placeholder="WordAddress CountryRegion"
        onKeyUp={handleTextChange}
      />
    </Form.Item>
    
    <Form.Item
      label="Description"
      name="note"
    >
       <Input
        label="Description"
        className="form-control"
        type="text"
        name="note"
        placeholder="Description"
        onKeyUp={handleTextChange}
      />
    </Form.Item>

</Form>
   
</div>
  
    </div>

      </Content>
 
    </Layout>
    </Flex>
    
  );
}

export default App;
