module.exports = {
    "extends": "airbnb",

    "plugins":[
        "react",
        "jsx-a11y",
        "import"
    ],

    "rules":{
    "object-curly-spacing":0,
    "react/jsx-filename-extension":0,
    "indent": [2,4],
    "quotes": ["warn", "double"],
    "react/jsx-indent":[2,4],
    "react/jsx-indent-props": [2,4],
    "max-len": [1, 200],
    "react/prefer-stateless-function":0,
    "jsx-a11y/anchor-is-valid":0,
    "linebreak-style": ["error", "unix"],
    "no-multiple-empty-lines":["error", {"max":2}],
    "react/forbid-prop-types": [2, {"forbid":["any"]}]
    }
}
