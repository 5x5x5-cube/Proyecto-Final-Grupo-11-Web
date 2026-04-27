import React from 'react';
import { Link } from 'react-router-dom';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import LocaleSelector from '@/design-system/components/LocaleSelector';
import { useHotel } from '@/contexts/HotelContext';
import { onSurfaceVariant } from '../theme/palette';
import {
  TopbarRoot,
  LeftSection,
  BreadcrumbRow,
  BreadcrumbSeparator,
  BreadcrumbLink,
  BreadcrumbCurrent,
  TopbarTitle,
  TopbarSubtitle,
  RightSection,
  NotificationButton,
  AdminAvatar,
} from './HotelAdminTopbar.styles';

interface Breadcrumb {
  label: string;
  href?: string;
}

interface HotelAdminTopbarProps {
  breadcrumbs?: Breadcrumb[];
  title?: string;
  subtitle?: string;
  actions?: React.ReactNode;
}

const HotelAdminTopbar: React.FC<HotelAdminTopbarProps> = ({
  breadcrumbs,
  title,
  subtitle,
  actions,
}) => {
  const { adminUser } = useHotel();

  return (
    <TopbarRoot>
      <LeftSection>
        {breadcrumbs && breadcrumbs.length > 0 && (
          <BreadcrumbRow>
            {breadcrumbs.map((crumb, index) => (
              <React.Fragment key={index}>
                {index > 0 && <BreadcrumbSeparator>/</BreadcrumbSeparator>}
                {crumb.href ? (
                  <Link to={crumb.href} style={{ textDecoration: 'none' }}>
                    <BreadcrumbLink>{crumb.label}</BreadcrumbLink>
                  </Link>
                ) : (
                  <BreadcrumbCurrent>{crumb.label}</BreadcrumbCurrent>
                )}
              </React.Fragment>
            ))}
          </BreadcrumbRow>
        )}
        {title && <TopbarTitle>{title}</TopbarTitle>}
        {subtitle && <TopbarSubtitle>{subtitle}</TopbarSubtitle>}
      </LeftSection>

      <RightSection>
        {actions}
        <LocaleSelector />
        <NotificationButton size="small">
          <NotificationsNoneIcon sx={{ fontSize: '18px', color: onSurfaceVariant }} />
        </NotificationButton>
        <AdminAvatar>{adminUser.initials}</AdminAvatar>
      </RightSection>
    </TopbarRoot>
  );
};

export default HotelAdminTopbar;
