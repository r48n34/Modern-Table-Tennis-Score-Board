import { ActionIcon, Menu, Group, Text, Tooltip } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { IconLanguage } from '@tabler/icons-react';

const languages = [
  { code: 'en', label: 'English', flag: 'EN' },
  { code: 'ja', label: '日本語', flag: 'JP' },
  { code: 'zh-TW', label: '繁體中文', flag: 'TW' },
  { code: 'zh-CN', label: '简体中文', flag: 'CN' },
];

function LanguageSwitcher() {
  const { i18n, t } = useTranslation();

  return (
    <Menu shadow="md" width={150} position="bottom-end">
      <Menu.Target>
        <Tooltip label={t('language.switchLanguage')}>
          <ActionIcon variant="light" aria-label="Language" size="md">
            <IconLanguage style={{ width: '70%', height: '70%' }} stroke={1.5} />
          </ActionIcon>
        </Tooltip>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>{t('language.label')}</Menu.Label>
        {languages.map((lang) => (
          <Menu.Item
            key={lang.code}
            onClick={() => i18n.changeLanguage(lang.code)}
            style={i18n.language === lang.code ? { backgroundColor: 'var(--mantine-color-blue-light)' } : undefined}
          >
            <Group gap="xs">
              <Text fw={i18n.language === lang.code ? 700 : 400}>{lang.flag}</Text>
              <Text>{lang.label}</Text>
            </Group>
          </Menu.Item>
        ))}
      </Menu.Dropdown>
    </Menu>
  );
}

export default LanguageSwitcher;
