/**
 * 인덱스 모듈
 *
 * @author RWB
 * @since 2022.01.24 Mon 22:54:17
 */

import React from 'react';
import { hydrate, render } from 'react-dom';
import { RecoilRoot } from 'recoil';
import App from './App';

const root = document.querySelector('main');

root?.hasChildNodes() ? hydrate(<RecoilRoot><App /></RecoilRoot>, root) : render(<RecoilRoot><App /></RecoilRoot>, root);