package io.github.karamegy.na2la;

import android.content.Intent;
import android.os.Bundle;
import android.webkit.JavascriptInterface;
import android.webkit.WebView;
import android.widget.Toast;

import com.getcapacitor.BridgeActivity;
import com.google.android.gms.auth.api.signin.GoogleSignIn;
import com.google.android.gms.auth.api.signin.GoogleSignInAccount;
import com.google.android.gms.auth.api.signin.GoogleSignInClient;
import com.google.android.gms.auth.api.signin.GoogleSignInOptions;
import com.google.android.gms.common.api.ApiException;
import com.google.android.gms.tasks.Task;

public class MainActivity extends BridgeActivity {

    private static final int RC_SIGN_IN = 9001;
    private GoogleSignInClient mGoogleSignInClient;

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        String webClientId = getString(R.string.default_web_client_id);

        GoogleSignInOptions gso = new GoogleSignInOptions.Builder(GoogleSignInOptions.DEFAULT_SIGN_IN)
                .requestIdToken(webClientId)
                .requestEmail()
                .build();

        mGoogleSignInClient = GoogleSignIn.getClient(this, gso);

        WebView webView = getBridge().getWebView();
        if (webView != null) {
            webView.addJavascriptInterface(new AndroidBridge(), "AndroidBridge");
        }
    }

    public class AndroidBridge {
        @JavascriptInterface
        public void launchNativeGoogleSignIn() {
            runOnUiThread(() -> {
                mGoogleSignInClient.signOut().addOnCompleteListener(MainActivity.this, task -> {
                    Intent signInIntent = mGoogleSignInClient.getSignInIntent();
                    startActivityForResult(signInIntent, RC_SIGN_IN);
                });
            });
        }
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);

        if (requestCode == RC_SIGN_IN) {
            Task<GoogleSignInAccount> task = GoogleSignIn.getSignedInAccountFromIntent(data);
            try {
                GoogleSignInAccount account = task.getResult(ApiException.class);
                if (account != null && account.getIdToken() != null) {
                    String idToken = account.getIdToken();
                    WebView webView = getBridge().getWebView();
                    if (webView != null) {
                        webView.post(() -> webView.evaluateJavascript(
                                "if(window.onNativeGoogleSignInSuccess){ window.onNativeGoogleSignInSuccess('" + idToken + "'); }",
                                null
                        ));
                    }
                }
            } catch (ApiException e) {
                Toast.makeText(this, "فشل اختيار حساب جوجل (كود: " + e.getStatusCode() + ")", Toast.LENGTH_LONG).show();
            }
        }
    }
}
