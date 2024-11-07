package com.example.app

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.core.view.WindowCompat
import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Button
import androidx.compose.material3.Text
import androidx.compose.material3.TextField
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.unit.dp
import com.example.app.ui.theme.AppTheme

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        WindowCompat.setDecorFitsSystemWindows(window, false)
        setContent {
            AppTheme {
                Index()
            }
        }
    }
}

@Composable
fun Index() {
    var catName by remember { mutableStateOf("") }

    Column(
        horizontalAlignment = Alignment.CenterHorizontally,
        modifier = Modifier
            .fillMaxWidth()
    ) {
        Box(
            modifier = Modifier
                .background(color = Color(0xffbfffe1))
                .fillMaxWidth(),
            contentAlignment = Alignment.Center
        ) {
            Text(text = "Kotlin + Compose", modifier = Modifier.padding(24.dp))
        }
        Box(
            modifier = Modifier
                .padding(16.dp)
                .height(300.dp),
            contentAlignment = Alignment.Center
        ) {
            Image(
                painter = painterResource(id = R.drawable.cat),
                contentDescription = "cat: $catName",
                modifier = Modifier
                    .size(200.dp)
                    .background(color = Color(0xffbfffe1), shape = CircleShape),
                contentScale = ContentScale.Crop
            )
        }

        Column(
            horizontalAlignment = Alignment.CenterHorizontally,
            modifier = Modifier
                .fillMaxWidth()
                .padding(16.dp)
        ) {
            Row(
                modifier = Modifier
                    .padding(vertical = 10.dp)
                    .fillMaxWidth(),
                verticalAlignment = Alignment.CenterVertically,
                horizontalArrangement = Arrangement.SpaceBetween
            ) {
                Button(
                    modifier = Modifier
                        .width(100.dp)
                        .height(40.dp)
                        .background(
                            color = Color(0xffbfffe1),
                            shape = RoundedCornerShape(50)
                        ),
                    onClick = {
                        // TODO
                    }
                ) {
                    Text(text = "Button")
                }
                Button(
                    modifier = Modifier
                        .width(100.dp)
                        .height(40.dp)
                        .background(
                            color = Color(0xffbfffe1),
                            shape = RoundedCornerShape(50)
                        ),
                    onClick = {
                        // TODO
                    }
                ) {
                    Text(text = "Button")
                }

            }
            Row(
                modifier = Modifier
                    .padding(vertical = 10.dp)
                    .fillMaxWidth(),
                verticalAlignment = Alignment.CenterVertically,
                horizontalArrangement = Arrangement.SpaceBetween
            ) {
                Button(
                    modifier = Modifier
                        .width(100.dp)
                        .height(40.dp)
                        .background(
                            color = Color(0xffbfffe1),
                            shape = RoundedCornerShape(50)
                        ),
                    onClick = {
                        // TODO
                    }
                ) {
                    Text(text = "Button")
                }
                Button(
                    modifier = Modifier
                        .width(100.dp)
                        .height(40.dp)
                        .background(
                            color = Color(0xffbfffe1),
                            shape = RoundedCornerShape(50)
                        ),
                    onClick = {
                        // TODO
                    }
                ) {
                    Text(text = "Button")
                }
            }
        }
        Row(
            verticalAlignment = Alignment.CenterVertically,
        ) {
            Text(
                text = "Cat name ",
                modifier = Modifier
                    .padding(vertical = 10.dp)
            )
            TextField(
                placeholder = { Text(text = "Enter cat name") },
                value = catName,
                onValueChange = { newName -> catName = newName }

            )
        }
    }
}


