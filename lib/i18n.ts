import { GetServerSidePropsContext } from 'next';
import { SSRConfig } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { ParsedUrlQuery } from 'querystring';

export async function getContextTranslations(context?: GetServerSidePropsContext<ParsedUrlQuery>, namespaces: string[] = ['common']): Promise<SSRConfig | null> {
  return context?.locale ? await serverSideTranslations(context.locale, namespaces) : Promise.resolve(null);
}
