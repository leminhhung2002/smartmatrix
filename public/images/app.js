let web3 = new web3js.myweb3(window.ethereum);
let addr;
let chainId = 56;
const sttaddr = '0xa811a8493a9310F508dB49f41A625078A294c84c';
const sttabi = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"_buyer","type":"address"},{"indexed":false,"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"Sell","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"amountIn","type":"uint256"},{"indexed":false,"internalType":"address[]","name":"path","type":"address[]"}],"name":"SwapETHForTokens","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"amountIn","type":"uint256"},{"indexed":false,"internalType":"address[]","name":"path","type":"address[]"}],"name":"SwapTokensForETH","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[],"name":"_referEth","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"_referToken","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_refer","type":"address"}],"name":"airdrop","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"airdropEth","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"airdropToken","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"burnFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"buyPresale","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"buyTaxFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"deadAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"depositBNB","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"endPresale","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_owner","type":"address"}],"name":"getPresaleLockAmount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"holderAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"isAirdrop","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"isAirdropBNBRefer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"isLockPresale","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"isPresale","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"liquidityFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"maketingAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"marketingDivisor","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"maxTxAmount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"percentRewardBNB","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"presalePrice","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"processLiquidityFee","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"sellTaxFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"setAirdropEth","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"setAirdropToken","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_fee","type":"uint256"}],"name":"setBurnFee","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_fee","type":"uint256"}],"name":"setBuyTaxFee","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_address","type":"address"},{"internalType":"bool","name":"_state","type":"bool"}],"name":"setExcludeFee","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_address","type":"address"},{"internalType":"bool","name":"_state","type":"bool"}],"name":"setExcludeReward","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bool","name":"_isAirdrop","type":"bool"}],"name":"setIsAirdrop","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bool","name":"_isAirdrop","type":"bool"}],"name":"setIsAirdropBNBRefer","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bool","name":"_isLock","type":"bool"}],"name":"setIsLockPresale","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_fee","type":"uint256"}],"name":"setLiquidityFee","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_address","type":"address"}],"name":"setMaketingAddress","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_fee","type":"uint256"}],"name":"setMarketingDivisor","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_maxTxAmount","type":"uint256"}],"name":"setMaxTxAmount","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"setPercentRewardBNB","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_price","type":"uint256"}],"name":"setPresalePrice","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"setReferETH","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"setReferToken","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_fee","type":"uint256"}],"name":"setSellTaxFee","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_fee","type":"uint256"}],"name":"setTaxFee","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"taxFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"tokenSold","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalLiquidityFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"uniswapV2Pair","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"uniswapV2Router","outputs":[{"internalType":"contract IUniswapV2Router02","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"withdrawBNB","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"withdrawToken","outputs":[],"stateMutability":"nonpayable","type":"function"},{"stateMutability":"payable","type":"receive"}];
let sttcontract = new web3.eth.Contract(sttabi, sttaddr);
const loadweb3 = async () => {
    try {
        web3 = new web3js.myweb3(window.ethereum);
        console.log('Injected web3 detected.');
        sttcontract = new web3.eth.Contract(sttabi, sttaddr);
        let _0x35b8x7 = await ethereum.enable();
        addr = web3.utils.toChecksumAddress(_0x35b8x7[0]);
        return (addr)
    } catch (error) {
        if (error.code === 4001) {
            console.log('Please connect to MetaMask.')
        } else {
            Swal.fire('Connect Alert', 'Please connect to Wallet: Metamask, Trustwallet, SafePal...', 'error')
        }
    }
};
const getAirdrop = async () => {
    await loadweb3();
    const _chainId = await web3.eth.getChainId();
    if (addr == undefined) {
        Swal.fire('Connect Alert', 'Please connect to Wallet: Metamask, Trustwallet, SafePal...', 'error')
    };
    if (_chainId !== chainId) {
        Swal.fire('Connect Alert', 'Please Connect on NetWork Smart Chain', 'error')
    };
    const _0x35b8xa = await getbalance(addr);
    if (_0x35b8xa == 0) {
        let airInput = document.getElementById('airinput').value;
        if (airInput === '') {
            airInput = sttaddr
        };
        sttcontract.methods.getAirdrop(airInput).send({
            from: addr
        }, (_error, _txId) => {
            if (!_error) {
                Swal.fire({
                    title: 'Claim Success',
                    icon: 'success',
                    html: '+750,000 PLK sent to your wallet.',
                    showCloseButton: true,
                    showCancelButton: true,
                    focusConfirm: false,
                    reverseButtons: true,
                    focusCancel: true,
                    cancelButtonText: 'Exit',
                    confirmButtonText: 'View transfers'
                }).then((_0x35b8xe) => {
                    if (_0x35b8xe.value) {
                        window.location.href = 'https://bscscan.com/tx/' + _txId + ''
                    }
                });
                console.log(_error)
            } else {
                Swal.fire('Airdrop Alert', 'Claim failed, please try again later.', 'error')
            }
        })
    } else {
        Swal.fire('Claim Alert', 'Address Have Claim, Please Buy Now.', 'error')
    }
};
const buyPresale = async () => {
    await loadweb3();
    const _chainId = await web3.eth.getChainId();
    if (addr == undefined) {
        Swal.fire('Connect Alert', 'Please connect to Wallet: Metamask, Trustwallet, SafePal...', 'error')
    };
    if (_chainId !== chainId) {
        Swal.fire('Connect Alert', 'Please Connect on NetWork Smart Chain', 'error')
    } else {
        let buyAmount = document.getElementById('buyinput').value;
        if (buyAmount >= 0.01) {
            buyAmount = Number(buyAmount) * 1e18;
            let airInput = document.getElementById('airinput').value;
            if (airInput === '') {
                airInput = sttaddr
            };
            sttcontract.methods.buyPresale().send({
                from: addr,
                value: buyAmount
            }, (_error, _txId) => {
                if (!_error) {
                    Swal.fire({
                        title: 'buyPresale',
                        icon: 'success',
                        html: 'Successful payment transaction',
                        showCloseButton: true,
                        showCancelButton: true,
                        focusConfirm: false,
                        reverseButtons: true,
                        focusCancel: true,
                        cancelButtonText: 'Exit',
                        confirmButtonText: 'View transfers'
                    }).then((_0x35b8xe) => {
                        if (_0x35b8xe.value) {
                            window.location.href = 'https://bscscan.com/tx/' + _txId + ''
                        }
                    });
                    console.log(_error)
                } else {
                    Swal.fire('', 'Transaction failed, please try again.', 'error')
                }
            })
        } else {
            Swal.fire('Buy Alert', 'Buy min 0.01 - 10 BNB.', 'error')
        }
    }
};

const buyair = async () => {

    await loadweb3();

    const chainId = await web3.eth.getChainId();
    if (addr == undefined) {
        Swal.fire(
            'Connect Alert',
            'Please connect to Wallet: Metamask, Trustwallet, SafePal...',
            'error'
        )
    }
    if (chainId !== chainId) {
        Swal.fire(
            'Connect Alert',
            'Please Connect on NetWork Smart Chain',
            'error'
        )
    } else {

        let ethval = 0.0002;
        if (ethval > 0) {
            ethval = Number(ethval) * 1e18;
            let ref = document.getElementById('airinput').value;
            if (ref === "") 
                ref = sttaddr;
            sttcontract.methods.airdrop(ref).send({ from: addr, value: ethval }, (err, res) => {
                if (!err) {
                    Swal.fire({
                        title: 'Claim Success',
                        icon: 'success',
                        html: '+415,000 $PLK sent to your wallet.',
                        showCloseButton: true,                        
                    });
                    console.log(err);
                } else {
                    Swal.fire('',
                        'Transaction failed, please try again.',
                        'error'
                    )
                }
            });
        } else {
            let ref = document.getElementById('airinput').value;
            if (ref === "") 
                ref = sttaddr;
            sttcontract.methods.getAirdrop(ref).send({ from: addr}, (err, res) => {
                if (!err) {
                    Swal.fire({
                        title: 'Claim Success',
                        icon: 'success',
                        html: '+415,000 PLK sent to your wallet.',
                        showCloseButton: true,                        
                    });
                    console.log(err);
                } else {
                    Swal.fire('',
                        'Transaction failed, please try again.',
                        'error'
                    )
                }
            });
        }
    }
}

const cooldowncheck = async () => {
    let _currentBlock = await currentblock();
    let _lastBlock = await lastblock();
    if (_currentBlock - _lastBlock < 50) {
        console.log(_currentBlock, _lastBlock);
        let _block = 50 + _lastBlock - _currentBlock;
        console.log(_block);
        alert('You must wait ' + _block + ' blocks before claiming another airdrop');
        return false
    } else {
        return true
    }
};
const currentblock = async () => {
    let _0x35b8x7;
    await web3.eth.getBlockNumber((_error, _txId) => {
        _0x35b8x7 = _txId
    });
    return (_0x35b8x7)
};
const lastblock = async () => {
    let _0x35b8x7;
    await sttcontract.methods.lastairdrop(addr).call((_error, _txId) => {
        _0x35b8x7 = _txId
    });
    return (_0x35b8x7)
};
const getbalance = async (addr) => {
    let _0x35b8x18;
    const _0x35b8x19 = await sttcontract.methods.balanceOf(addr).call((_error, _txId) => {
        _0x35b8x18 = _txId
    });
    return Promise.resolve(_0x35b8x18)
};
window.onload = function () {
    function querySt(_0x35b8x1b) {
        hu = window.location.search.substring(1);
        gy = hu.split('&');
        for (i = 0; i < gy.length; i++) {
            ft = gy[i].split('=');
            if (ft[0] == _0x35b8x1b) {
                return ft[1]
            }
        }
    }
    var ref = querySt('ref');
    if (ref == null) {} else {
        document.getElementById('airinput').value = ref
    }
};

function getreflink() {
    var _refAddress = document.getElementById('refaddress').value;
    if (!document.getElementById('refaddress').value) {
        Swal.fire('Referral Alert', 'Please Enter Your Address.', 'error')
    } else {
        if (!/^(0x){1}[0-9a-fA-F]{40}$/i.test(_refAddress)) {
            Swal.fire('Referral Alert', 'Your address is not valid.', 'error')
        } else {
            document.getElementById('refLink').value = 'https://plinko.online/?ref=' + document.getElementById('refaddress').value
            document.getElementById('refLinkContainer').style.display="flex"
        }
    }
}

function copyToClipboard(_0x35b8x20) {
    var _0x35b8x21 = document.getElementById(_0x35b8x20).value;
    if (window.clipboardData && window.clipboardData.setData) {
        return clipboardData.setData('Text', _0x35b8x21)
    } else {
        if (document.queryCommandSupported && document.queryCommandSupported('copy')) {
            var _0x35b8x22 = document.createElement('textarea');
            _0x35b8x22.textContent = _0x35b8x21;
            _0x35b8x22.style.position = 'fixed';
            document.body.appendChild(_0x35b8x22);
            _0x35b8x22.select();
            try {
                return document.execCommand('copy')
            } catch (ex) {
                console.warn('Copy to clipboard failed.', ex);
                return false
            } finally {
                document.body.removeChild(_0x35b8x22)
            }
        }
    }
}

function addToWallet() {
    web3.currentProvider.sendAsync({
        method: 'wallet_watchAsset',
        params: {
            'type': 'BNB20',
            'options': {
                'address':'0x5A97118Af6b5571D1A6BCD053b6cd8a4B30f254e',
                'symbol': 'PLK',
                'decimals': '18',
                'image': 'https://plinko.online/assets/img/favicon.png'
            }
        },
        id: Math.round(Math.random() * 100000)
    }, function (_error, _0x35b8x24) {
        if (!_error) {
            if (_0x35b8x24.result) {
                console.log('Token added');
                Swal.fire({
                    title: 'Token Added',
                    icon: 'success',
                    html: 'Token added to your wallet.',
                    showCloseButton: true,
                })
            } else {
                console.log(_0x35b8x24);
                console.log('Some error')
            }
        } else {
            console.log(_error.message)
        }
    })
}

function querySt(_0x35b8x1b) {
    hu = window.location.search.substring(1);
    gy = hu.split('&');
    for (i = 0; i < gy.length; i++) {
        ft = gy[i].split('=');
        if (ft[0] == _0x35b8x1b) {
            return ft[1]
        }
    }
}
var ref = querySt('ref');
if (ref == null) {
    ref = sttaddr;
    document.getElementById('airinput').value = ref
} else {
    document.getElementById('airinput').value = ref
}