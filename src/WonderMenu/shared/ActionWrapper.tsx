import React, { useEffect } from 'react';
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
import { RequestParam } from '../../types/RequestParams';

interface IProps {
  name: string;
  label: string;
  description: string;
  icon: React.ReactNode;
  parametersMap: RequestParam;
  initialParam: string;
}

export const ActionWrapper: React.FC<IProps> = ({
  name,
  label,
  description,
  icon,
  parametersMap,
  initialParam,
}) => {
  const [viewedParams, setViewedParams] = React.useState<string[]>([
    initialParam,
  ]);
  const [paramsToSend, setParamsToSend] = React.useState<RequestParam>({});

  const handleParamSelect = (param: string) => {
    setViewedParams([...viewedParams, param]);
  };

  const handleParamsUpdate = (paramObj: RequestParam) => {
    setParamsToSend({ ...paramsToSend, ...paramObj });
  };

  return (
    <Accordion.Item value={name}>
      <AccordionControl icon={icon}>
        <AccordionLabel label={label} description={description} />
      </AccordionControl>
      <Accordion.Panel>
        <Grid align="center" sx={[{ paddingLeft: 30 }]}>
          {viewedParams.map((parameter) => (
            <Grid.Col span={3}>
              <Select
                styles={{
                  label: {
                    fontSize: 11,
                  },
                }}
                transitionDuration={150}
                transition="pop-top-left"
                transitionTimingFunction="ease"
                clearable
                label={parameter}
                data={(parametersMap[parameter] as string[] | number[]) || []}
                onChange={(value) => handleParamsUpdate({ [parameter]: value })}
              />
            </Grid.Col>
          ))}
          <Grid.Col
            span={viewedParams.length > 1 ? viewedParams.length - 1 : 4}
          >
            <Menu shadow="md" width={100} position="bottom-start">
              <Menu.Target>
                <ActionIcon variant="outline" sx={{ marginTop: 22 }}>
                  <IconPlus size={20} />
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
