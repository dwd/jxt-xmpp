import { Namespace as NS } from 'xmpp-constants';


const CONDITIONS = [
    'aborted',
    'account-disabled',
    'credentials-expired',
    'encryption-required',
    'incorrect-encoding',
    'invalid-authzid',
    'invalid-mechanism',
    'malformed-request',
    'mechanism-too-weak',
    'not-authorized',
    'temporary-auth-failure'
];


export default function (JXT) {

    let Utils = JXT.utils;

    let Mechanisms = JXT.define({
        name: 'sasl2',
        namespace: NS.SASL2,
        element: 'mechanisms',
        fields: {
            mechanisms: Utils.multiTextSub(NS.SASL2, 'mechanism')
        }
    });

    JXT.define({
        name: 'sasl2Auth',
        eventName: 'sasl2:auth',
        namespace: NS.SASL2,
        element: 'authenticate',
        topLevel: true,
        fields: {
            value: Utils.textSub(NS.SASL2, 'initial-response'),
            mechanism: Utils.attribute('mechanism')
        }
    });

    JXT.define({
        name: 'sasl2Challenge',
        eventName: 'sasl2:challenge',
        namespace: NS.SASL2,
        element: 'challenge',
        topLevel: true,
        fields: {
            value: Utils.text()
        }
    });

    JXT.define({
        name: 'sasl2Response',
        eventName: 'sasl2:response',
        namespace: NS.SASL2,
        element: 'response',
        topLevel: true,
        fields: {
            value: Utils.text()
        }
    });

    JXT.define({
        name: 'sasl2Abort',
        eventName: 'sasl2:abort',
        namespace: NS.SASL2,
        element: 'abort',
        topLevel: true
    });

    JXT.define({
        name: 'sasl2Success',
        eventName: 'sasl2:success',
        namespace: NS.SASL2,
        element: 'success',
        topLevel: true,
        fields: {
            value: Utils.textSub(NS.SASL2, 'additional-data'),
            authzid: Utils.textSub(NS.SASL2, 'authorization-identifier')
        }
    });

    JXT.define({
        name: 'sasl2Failure',
        eventName: 'sasl2:failure',
        namespace: NS.SASL2,
        element: 'failure',
        topLevel: true,
        fields: {
            lang: {
                get: function () {

                    return this._lang || '';
                },
                set: function (value) {

                    this._lang = value;
                }
            },
            condition: Utils.enumSub(NS.SASL2, CONDITIONS),
            $text: {
                get: function () {

                    return Utils.getSubLangText(this.xml, NS.SASL2, 'text', this.lang);
                }
            },
            text: {
                get: function () {

                    let text = this.$text;
                    return text[this.lang] || '';
                },
                set: function (value) {

                    Utils.setSubLangText(this.xml, NS.SASL2, 'text', value, this.lang);
                }
            }
        }
    });


    JXT.extendStreamFeatures(Mechanisms);
}
