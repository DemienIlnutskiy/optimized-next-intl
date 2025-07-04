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

    const localePrefix = locale === config.defaultLocale ? '' : `/${locale}`;

    const href = `${localePrefix}${pathname === '/' && localePrefix ? '' : pathname}`;

    function handleNavigate() {
        setCookie({ name: switchLocaleCookieName, value: locale, maxAge: 60 })
    };

    return <LinkComponent
        ref={ref}
        hrefLang={locale}
        scroll={scroll}
        className={className}
        {...rest}
        href={href}
        onNavigate={handleNavigate}
    />;
}

const LocaleLink = forwardRef(LocaleLinkComponent);

export default LocaleLink;
