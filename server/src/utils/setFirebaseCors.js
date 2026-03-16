const admin = require('firebase-admin');

// HARDCODED FOR ONE-TIME SETUP DUE TO ENV PARSING ISSUES
const projectId = 'iilmignite';
const clientEmail = 'firebase-adminsdk-fbsvc@iilmignite.iam.gserviceaccount.com';
const privateKey = "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDWAJe1eXJDAHhp\n2AekvnSq+WSj8V/wUpzx3k+iC8RJBE02koo1/9oaXR6OPltOtikESXE6+JMfGJto\n+dWKjAYBjNJ/gfjoXJe8oL/XJm23fPqHyExQI3TgtPbupEAhuEyERcvrI/xQr1qI\nGdM18xT23N8kE9DpJaBiNzia3EoiRvD/zsREZikWtg+AjZAw+r1Ygw6MG2seumBW\nwqxEVxuLuxfXfyJwRpQEsFIjCo/ww2wpHabfms4RZX1e46OuAT3lq9/InD0SrPjn\nnBoI2fwBWnivS8QybwvjRzWC8L8f6WVdoT7RHzfx5BX/df+OHdcepvey8eli0oom\nypHOTdgtAgMBAAECggEABD8hw4+j5VF6kjsft7Sx0vy88wXkrfutsp0DPod2Py6v\nK5CP3o9zsAc+BnuVS0QRH00nypBJNxpBZz1h7+xkaB53xOD64/2GY09bTzUrgzMf\nM5eVcBesB5N/vO+UeDbUieFqsQFXTfCU3tOIXe8zcMykPu6HvECrZJeM74HElNaD\nPlvlmwAbKCq6bUFyUKdy//o3iCqOpoNZm5hbPKQfOTOq7Hc3EUoS0oRB5sY+PAHx\n2g3GmnvVLptBkf7SkfqEb2ffyGZ/ASXi2cmDWLayCWdtjbumqtbFWpkntP+w6l3Y\nZ2fIGqblmpHGKTFwxNKvf0kiFUNOryWE9ux01rQlgQKBgQD4nI08w6gnLgiUcbo5\nal5X/mDXnGvMWkcb0ftfAI1cIEH1byF4sFJIM+NawO+twaHbsoTLLB2SL5p1hsAg\nJ99QaFwrBaY0Ra4MOVlZva/m2a+xfVtXnXx9bG59dy24JutlwOCa0GvhJiULqeAu\nltGp53eZEhlkD+Y1XnDjSkXy7QKBgQDcXLt7tldrRFUtHAoMcjW1riURKiHT5v8z\nzCSKx7QfBh5Dvz8lLBgZs0ICGuqORxx5VYBrDahoxnGHWhQ+w9OypbPdQhHO/2kG\niDKVVhTGGeUNon7c4p2tZSDm3YXTF4z0cOrczmflax5E5yJGPDP/8kNG7bx6/53d\nmk24hgCSQQKBgQDo2YgXb5HhEGaM0m//MrcmZ2TAzQrSHYQYdHWhp1y++p+Mhwes\niEiow6Cf8bEK5x74LJ3fxXP05Y0fopP0CiRIpVYeHW5r6w9294fOW7GS4DSEYsrY\npvJgbtyVurghkKJNbXdwyOEhwZ5U7EjCmhPJtLf5sFADvjh5p/jHiVs2iQKBgQCc\npCZ5aEJ385kAeeACvOTFAsdCjkqBkMB0F3caV58INpco3TeLuu5exnfzeyKkhJQP\nA+JHNuwxnm5xIm0luJoxcWyLqT1zgUcs53/de9VEhH+303yOk2A2M57RvUI1rZX6\n5JFu6CIeiKh5njtU5dKo65M7Rh8m57FWJyt8MXUSgQKBgHW2ViJ7xOJovAroE0PO\noGCJ93xdSvGQJ6CMlOlWaZFMp/0Vwn26ceaAsY5ipUSi9QVEdfP/gCcVXOU/fGbH\nNQ0pUIop4FzvFQJttzQo4p+G7LNXg9WGWo6yrcsPsBOhGJR41B/NrUg4hL8Ntaw6\nVFrEP32R+/B+UbB40rcPy+aY\n-----END PRIVATE KEY-----\n".replace(/\\n/g, '\n');

async function run() {
  console.log('--- Firebase CORS Fix (Hardcoded) Starting ---');
  
  const bucketName = `${projectId}.firebasestorage.app`;
  console.log('Configuring bucket:', bucketName);

  try {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: projectId,
        clientEmail: clientEmail,
        privateKey: privateKey,
      }),
      storageBucket: bucketName
    });

    const bucket = admin.storage().bucket();
    
    const corsConfiguration = [
      {
        origin: ['*'],
        method: ['GET', 'POST', 'PUT', 'DELETE', 'HEAD', 'OPTIONS'],
        responseHeader: ['Content-Type', 'x-goog-resumable', 'Authorization', 'Content-Length', 'User-Agent'],
        maxAgeSeconds: 3600
      }
    ];

    await bucket.setCorsConfiguration(corsConfiguration);
    console.log('✅ Success: CORS configured for ' + bucketName);
    
    try {
      const altBucket = admin.storage().bucket(`${projectId}.appspot.com`);
      await altBucket.setCorsConfiguration(corsConfiguration);
      console.log('✅ Success: CORS also set on .appspot.com');
    } catch (e) {}
    
    process.exit(0);
  } catch (err) {
    console.error('❌ Failed:', err);
    process.exit(1);
  }
}

run();
