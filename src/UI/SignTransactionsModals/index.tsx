import React from 'react';

import {
  getIsProviderEqualTo,
  LoginMethodsEnum,
  useSignTransactions,
  useGetAccountProvider
} from '@elrondnetwork/dapp-core';
import SignWithExtensionModal from './SignWithExtensionModal';
import SignWithLedgerModal from './SignWithLedgerModal';
import SignWithWalletConnectModal from './SignWithWalletConnectModal';

export function SignTransactionsModals({ className }: { className?: string }) {
  const {
    callbackRoute,
    transactions,
    error,
    sessionId,
    onAbort,
    hasTransactions
  } = useSignTransactions();

  const { providerType } = useGetAccountProvider();

  const signProps = {
    handleClose: onAbort,
    error,
    sessionId,
    transactions: transactions!,
    providerType,
    callbackRoute: callbackRoute!,
    className
  };

  return error || hasTransactions ? (
    <React.Fragment>
      {getIsProviderEqualTo(LoginMethodsEnum.ledger) && (
        <SignWithLedgerModal {...signProps} />
      )}
      {getIsProviderEqualTo(LoginMethodsEnum.walletconnect) && (
        <SignWithWalletConnectModal {...signProps} />
      )}
      {getIsProviderEqualTo(LoginMethodsEnum.extension) && (
        <SignWithExtensionModal {...signProps} />
      )}
    </React.Fragment>
  ) : null;
}

export default SignTransactionsModals;
