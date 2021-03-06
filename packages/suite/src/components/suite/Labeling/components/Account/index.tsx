import React from 'react';
import styled from 'styled-components';
import * as accountUtils from '@wallet-utils/accountUtils';
import * as deviceUtils from '@suite-utils/device';
import { Translation } from '@suite-components';
import { Props } from './Container';
import WalletLabeling from '../Wallet';

const TabularNums = styled.span`
    font-variant-numeric: tabular-nums;
    text-overflow: ellipsis;
    overflow: hidden;
`;

const Account = (props: Props) => {
    const { device } = props;
    const accounts = !Array.isArray(props.account) ? [props.account] : props.account;

    if (accounts.length < 1) return null;

    const accountLabel: JSX.Element = (
        <Translation
            id="LABELING_ACCOUNT"
            values={{
                networkName: (
                    <Translation id={accountUtils.getTitleForNetwork(accounts[0].symbol)} />
                ), // Bitcoin, Ethereum, ...
                index: accounts[0].index + 1, // this is the number which shows after hash, e.g. Ethereum #3
            }}
        />
    );

    // display account type (e.g.'segwit') in the brackets after the account label
    // if (accounts[0].accountType !== 'normal') {
    //     accountLabel = (
    //         <Translation
    //             id="LABELING_ACCOUNT_WITH_TYPE"
    //             values={{
    //                 networkName,
    //                 index: accounts[0].index + 1,
    //                 type:
    //                     accounts[0].accountType === 'segwit'
    //                         ? messages.TR_ACCOUNT_TYPE_SEGWIT
    //                         : messages.TR_ACCOUNT_TYPE_LEGACY,
    //             }}
    //         />
    //     );
    // }

    if (device && !accounts.find(a => a.deviceState === device.state)) {
        // account is not associated with selected device, add wallet label
        const accountDevice = accountUtils.findAccountDevice(accounts[0], props.devices);
        if (accountDevice) {
            return (
                <>
                    <WalletLabeling
                        device={accountDevice}
                        useDeviceLabel={!deviceUtils.isSelectedDevice(device, accountDevice)}
                    />{' '}
                    <TabularNums>{accountLabel}</TabularNums>
                </>
            );
        }
    }

    return <TabularNums>{accountLabel}</TabularNums>;
};

export default Account;
