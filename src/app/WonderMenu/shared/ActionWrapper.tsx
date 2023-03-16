import React, { useRef } from 'react';
import {
  Accordion,
  Select,
  Grid,
  ActionIcon,
  Menu,
  Button,
} from '@mantine/core';
import { AccordionControl } from '../shared/AccordionControl';
import { AccordionLabel } from '../shared/AccordionLabel';
import { IconPlus } from '@tabler/icons-react';
import { RequestParam } from '../../../types/RequestParams';

interface IProps {
  name: string;
  label: string;
  description: string;
  icon: React.ReactNode;
  parametersMap: Record<string, string[]>;
  updateHover: (name: string | null) => void;
  onSubmit: (name: string, params: RequestParam) => void;
}

export const ActionWrapper: React.FC<IProps> = ({
  name,
  label,
  description,
  icon,
  parametersMap,
  updateHover,
  onSubmit,
}) => {
  const menuRef = useRef();
  const [viewedParams, setViewedParams] = React.useState<string[]>([
    Object.keys(parametersMap)?.[0],
  ]);
  const [paramsToSend, setParamsToSend] = React.useState<RequestParam>({});

  const handleParamSelect = (param: string) => {
    setViewedParams([...viewedParams, param]);
  };

  const handleParamsUpdate = (paramObj: RequestParam) => {
    setParamsToSend({ ...paramsToSend, ...paramObj });
  };

  const onMouseEnter = () => {
    updateHover(name);
  };

  const onMouseLeave = () => {
    updateHover(null);
  };

  return (
    <Accordion.Item value={name}>
      <AccordionControl
        icon={icon}
        onSubmit={() => onSubmit(name, paramsToSend)}
      >
        <AccordionLabel label={label} description={description} />
      </AccordionControl>
      <Accordion.Panel>
        <Grid align="center" sx={[{ paddingLeft: 37 }]}>
          {viewedParams.map((parameter) => (
            <Grid.Col span={3} sx={[{ padding: 3 }]}>
              <Select
                styles={{
                  label: {
                    fontSize: 11,
                  },
                  input: {
                    fontSize: 11,
                    color: '#553AF6',
                    minHeight: 0,
                    maxHeight: 24,
                  },
                  item: {
                    '&[data-selected]': {
                      '&, &:hover': {
                        backgroundColor: 'transparent',
                        color: '#553AF6',
                      },
                    },
                    fontSize: 11,
                  },
                }}
                transitionDuration={150}
                transition="pop-top-left"
                transitionTimingFunction="ease"
                label={parameter}
                data={
                  (parametersMap[parameter] as string[] | number[] | any) || []
                }
                onChange={(value) =>
                  handleParamsUpdate({ [parameter]: value as any })
                }
              />
            </Grid.Col>
          ))}
          <Grid.Col
            span={viewedParams.length > 1 ? viewedParams.length - 1 : 4}
          >
            <Menu
              shadow="md"
              position="bottom-start"
              styles={{
                label: {
                  fontSize: 11,
                },
                item: {
                  '&[data-selected]': {
                    '&, &:hover': {
                      backgroundColor: 'transparent',
                      color: '#553AF6',
                    },
                  },
                  fontSize: 11,
                },
              }}
            >
              <Menu.Target>
                <ActionIcon variant="light" size="sm" sx={{ marginTop: 22 }}>
                  <IconPlus size={13} color="#553AF6" />
                </ActionIcon>
              </Menu.Target>
              <Menu.Dropdown>
                {Object.entries(parametersMap)
                  .filter((obj) => !viewedParams.includes(obj[0]))
                  .map((param) => (
                    <Menu.Item onClick={() => handleParamSelect(param[0])}>
                      {param[0]}
                    </Menu.Item>
                  ))}
              </Menu.Dropdown>
            </Menu>
          </Grid.Col>
        </Grid>
      </Accordion.Panel>
    </Accordion.Item>
  );
};
