"use client";

import LinkComponent, { type LinkProps } from 'next/link';
import {
    forwardRef,
    type ComponentProps,
    type Ref,
} from 'react';
import config from '../../config/intl_config';
import usePathname from '../hooks/use_path_name';
import { swiutchLocaleCookieName as switchLocaleCookieName } from '../../config/cookie_key';
import setCookie from '../functions/set_cookie';

type NextLinkProps = Omit<ComponentProps<'a'>, keyof LinkProps> &
    Omit<LinkProps, 'locale' | 'href' | 'prefetch' | 'onNavigate' | 'hrefLang'>;

type Props = NextLinkProps & {
    locale: string;
};

function LocaleLinkComponent(
    {
        locale,
        scroll,
        className,
        ...rest
    }: Props,
    ref: Ref<HTMLAnchorElement>
) {
    const pathname = usePathname();

    const isDefaultLocale = locale === config.defaultLocale;

    const localePrefix = isDefaultLocale ? '' : `/${locale}`;

    const href = `${localePrefix}${pathname === '/' && localePrefix ? '' : pathname}`;

    function handleNavigate(e: React.MouseEvent<HTMLAnchorElement>) {
        if (isDefaultLocale) {
            e.preventDefault();
        }

        setCookie({ name: switchLocaleCookieName, value: locale, maxAge: 15 });

        if (isDefaultLocale) {
            window.location.href = href;
        }
    };

    return <LinkComponent
        ref={ref}
        hrefLang={locale}
        scroll={scroll}
        className={className}
        {...rest}
        href={href}
        onClick={handleNavigate}
    />;
}

const LocaleLink = forwardRef(LocaleLinkComponent);

export default LocaleLink;
