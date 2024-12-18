"use client";
import { AuthProvider } from "@/contexts/portal-auth-context";
import { ServiceProviderProvider } from "@/contexts/service-provider-context";
import { AllServiceProviderProvider } from "@/contexts/all-service-provider-context";
import { CompanyProvider } from "@/contexts/company-context";
import { CompaniesProvider } from "@/contexts/service-provider-portal/companies-context";
import { StormAuthProvider } from "@/contexts/storm-auth-context";
import { ThemeProvider } from "next-themes";


interface IProvidersProps {
  children: JSX.Element;
}

export const UserPortalProviders = ({ children }: IProvidersProps) => {
  return (
    <CompanyProvider companyName="NREP">

      <AllServiceProviderProvider>
        <ThemeProvider attribute="class">
          {children}
        </ThemeProvider>
      </AllServiceProviderProvider>
    </CompanyProvider>
  );
};

export const ServiceProviderPortalProviders = ({ children }: IProvidersProps) => {
  return (
    <CompaniesProvider providerName="Dagens Industri"> {/*Later change this to come from the search params [id]*/}
      {children}
    </CompaniesProvider >

  );
};

export const PortalProviders = ({ children }: IProvidersProps) => {
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  );
};

export const AuthProviders = ({ children }: IProvidersProps) => {
  return (
    <StormAuthProvider>
      {children}
    </StormAuthProvider>
  )
}