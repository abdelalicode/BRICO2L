import React from "react";
import { Sidebar } from "flowbite-react";
import { HiArrowSmRight, HiChartPie, HiInbox, HiShoppingBag, HiTable, HiUser, HiViewBoards } from "react-icons/hi";

export default function SideBar() {
  return (
    <Sidebar  aria-label="Sidebar with logo branding example" >
      <Sidebar.Logo img="https://i.ibb.co/kDVqMN5/LOGO-3.png" imgAlt="Flowbite logo">
      </Sidebar.Logo>
      <Sidebar.Items>
        <Sidebar.ItemGroup >
          <Sidebar.Item icon={HiChartPie}>
            Dashboard
          </Sidebar.Item>
          <Sidebar.Item icon={HiViewBoards}>
            Kanban
          </Sidebar.Item>
          <Sidebar.Item icon={HiInbox}>
            Inbox
          </Sidebar.Item>
          <Sidebar.Item icon={HiUser}>
            Users
          </Sidebar.Item>
          <Sidebar.Item icon={HiShoppingBag}>
            Products
          </Sidebar.Item>
          <Sidebar.Item icon={HiArrowSmRight}>
            Sign In
          </Sidebar.Item>
          <Sidebar.Item icon={HiTable}>
            Sign Up
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}
