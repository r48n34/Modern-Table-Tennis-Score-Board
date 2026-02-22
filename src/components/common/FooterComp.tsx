import { Container, Group, Anchor, Text, Box } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { IconScoreboard } from '@tabler/icons-react';

import classes from '../../style/FooterSimple.module.css';
import ColorToggleBtn from './ColorToggleBtn';
import LanguageSwitcher from './LanguageSwitcher';


function FooterComp() {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const links = [
        { link: '/', label: t('app.home'), format: "internal" },
        { link: '/roadmap/en', label: t('footer.roadmapEn'), format: "internal" },
        { link: '/roadmap/ch', label: t('footer.roadmapCh'), format: "internal" },
    ];

    const items = links.map((link) => (
        <Anchor<'a'>
            c="dimmed"
            key={link.label}
            href={link.link}
            onClick={(event) => {
                event.preventDefault();
                if (link.format === "internal") {
                    navigate(link.link)
                }
                else {
                    !!window && window.open(link.link, '_blank')
                }
            }}
            size="sm"
        >
            {link.label}
        </Anchor>
    ));

    return (
        <div className={classes.footer} style={{ minHeight: "100%" }}>
            <Container className={classes.inner}>
                <Box>
                    <Group>
                        <IconScoreboard size={24} />
                        <Text fw={300} fz={20} ml={-10}>
                            {t('app.title')}
                        </Text>
                    </Group>

                    <Text c="dimmed" fz={12} mt={4}>
                        © {new Date().getFullYear()} Reemo Studio. All Rights Reserved.
                    </Text>
                </Box>

                <Group className={classes.links}>
                    {items}
                    <LanguageSwitcher />
                    <ColorToggleBtn />
                </Group>


            </Container>
        </div>
    );
}

export default FooterComp
