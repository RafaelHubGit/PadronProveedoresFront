import { Tabs, Dropdown, Menu } from "antd";
import { DownOutlined, AppstoreOutlined } from "@ant-design/icons";

const menuConfig = [
  { key: "1", label: "Inicio", icon: <AppstoreOutlined />, type: "tab" },
  { key: "2", label: "Servicios", icon: <AppstoreOutlined />, type: "tab" },
  {
    key: "3",
    label: "Más Opciones",
    icon: <AppstoreOutlined />,
    type: "dropdown",
    submenu: [
      { key: "3-1", label: "Opción 1" },
      { key: "3-2", label: "Opción 2" },
      { key: "3-3", label: "Opción 3" },
    ],
  },
  { key: "4", label: "Contacto", icon: <AppstoreOutlined />, type: "tab" },
];

export const MenuComponent = () => {
  return (
    <div style={{ height: "100%", width: "90vw" }}>
        <Tabs
            defaultActiveKey="1"
            tabPosition="top"
            centered
            items={menuConfig.map((item) => {
                if (item.type === "dropdown") {
                    const menu = (
                    <Menu>
                        {item.submenu?.map((sub) => (
                        <Menu.Item key={sub.key}>{sub.label}</Menu.Item>
                        ))}
                    </Menu>
                    );

                    return {
                    key: item.key,
                    label: (
                        <Dropdown overlay={menu} trigger={["click"]}>
                        <span style={{ cursor: "pointer" }}>
                            {item.icon} {item.label} <DownOutlined />
                        </span>
                        </Dropdown>
                    ),
                    };
                }

                return {
                    key: item.key,
                    label: (
                    <span>
                        {item.icon} {item.label}
                    </span>
                    ),
                };
            })}
        />
    </div>
  );
};
