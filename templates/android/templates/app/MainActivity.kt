package {PackageName}

import android.os.Bundle
import android.support.v7.app.AppCompatActivity
import android.view.Gravity
import org.jetbrains.anko.*;

class MainActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        verticalLayout {
            textView {
                text = "hello world"
                gravity = Gravity.CENTER
            }.lparams(width = matchParent, height = matchParent)
        }
    }
}