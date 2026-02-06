import React, { createContext, useState, Dispatch, SetStateAction, useEffect } from 'react';
import { EmailType } from 'src/types/apps/email';
import useSWR from 'swr';
import { deleteFetcher, getFetcher } from 'src/api/global-fetcher';

interface EmailContextType {
  emails: EmailType[];
  selectedEmail: EmailType | null;
  setSelectedEmailId: Dispatch<SetStateAction<number | null>>;

  deleteEmail: (emailId: number) => void;
  toggleStar: (emailId: number) => void;
  toggleImportant: (emailId: number) => void;
  setFilter: Dispatch<SetStateAction<string>>;
  filter: string;
  searchQuery: string;
  loading: boolean;
  error: Error | null;

  setSearchQuery: Dispatch<SetStateAction<string>>;
}

const initialEmailContext: EmailContextType = {
  emails: [],
  selectedEmail: null,

  filter: 'inbox',
  searchQuery: '',
  loading: true,
  error: null,
  setSelectedEmailId: () => {},
  deleteEmail: () => {},
  toggleStar: () => {},
  toggleImportant: () => {},
  setFilter: () => {},
  setSearchQuery: () => {},
};

export const EmailContext = createContext<EmailContextType>(initialEmailContext);

export const EmailContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [emails, setEmails] = useState<EmailType[]>([]);
  const [selectedEmailId, setSelectedEmailId] = useState<number | null>(null);
  const [filter, setFilter] = useState<string>('inbox');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const {
    data: emailData,
    isLoading: isEmailLoading,
    error: emailError,
    mutate,
  } = useSWR('/api/data/email/EmailData', getFetcher);

  //   // Derive selectedEmail from emails[] to avoid desync
  const selectedEmail = emails.find((e) => e.id === selectedEmailId) || null;

  useEffect(() => {
    if (emailData) {
      setEmails(emailData.data);
      if (!selectedEmailId && emailData.data.length > 0) {
        setSelectedEmailId(emailData.data[0].id);
      }
      setLoading(isEmailLoading);
    } else if (emailError) {
      setError(emailError);
      setLoading(isEmailLoading);
    } else {
      setLoading(isEmailLoading);
    }
  }, [emailData, emailError, isEmailLoading, emails?.length]);

  const deleteEmail = async (emailId: number) => {
    try {
      await mutate(deleteFetcher('/api/data/email/delete', { emailId }));

      if (selectedEmailId === emailId) {
        setSelectedEmailId(null);
      }
    } catch (error) {
      console.error('Error deleting email:', error);
    }
  };

  const toggleStar = (emailId: number) => {
    setEmails((prev) =>
      prev.map((email) => (email.id === emailId ? { ...email, starred: !email.starred } : email)),
    );
  };

  const toggleImportant = (emailId: number) => {
    setEmails((prev) =>
      prev.map((email) =>
        email.id === emailId ? { ...email, important: !email.important } : email,
      ),
    );
  };

  return (
    <EmailContext.Provider
      value={{
        emails,
        selectedEmail,
        setSelectedEmailId,
        deleteEmail,
        toggleStar,
        toggleImportant,
        setFilter,
        filter,
        error,
        loading,
        searchQuery,
        setSearchQuery,
      }}
    >
      {children}
    </EmailContext.Provider>
  );
};
