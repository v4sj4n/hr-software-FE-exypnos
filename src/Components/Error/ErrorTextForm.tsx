import { ReactNode } from 'react'

export const ErrorText: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <p
      style={{
        fontSize: '0.8rem',
        color: '#d32f2f',
        marginTop: '.25rem',
        marginBottom: 0,
      }}
    >
      {children}
    </p>
  )
}
